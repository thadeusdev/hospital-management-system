# syntax=docker/dockerfile:1

# ---------- 1. Build the React app ----------
FROM node:18-alpine AS client-build
WORKDIR /client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# ---------- 2. Rails base image ----------
# Full (non-slim) image: it already ships the compiler and libpq headers that the
# pg and sassc gems need, so no apt-get step is required.
FROM ruby:2.7.8-bullseye AS base
ENV LANG=C.UTF-8
WORKDIR /app
COPY Gemfile Gemfile.lock ./

# ---------- 3. Development (used by docker compose) ----------
FROM base AS development
RUN bundle install
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "rm -f tmp/pids/server.pid && bundle exec rails db:prepare && bundle exec rails server -b 0.0.0.0 -p 3000"]

# ---------- 4. Production (Render, or `docker compose --profile prod up`) ----------
FROM base AS production
ENV RAILS_ENV=production \
    RAILS_SERVE_STATIC_FILES=true \
    RAILS_LOG_TO_STDOUT=true
RUN bundle config set --local without 'development test' && bundle install
COPY . .
COPY --from=client-build /client/build/ ./public/
ARG GIT_SHA=unknown
ENV GIT_SHA=${GIT_SHA}
EXPOSE 3000
CMD ["sh", "-c", "bundle exec rails db:prepare && bundle exec puma -C config/puma.rb"]
