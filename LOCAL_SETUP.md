# Local setup (Windows 11 + Docker Desktop)

Prerequisites: Docker Desktop (WSL2 backend), Node.js 18+, Git.
Tip: clone the repo inside the WSL2 filesystem (e.g. `\\wsl$\Ubuntu\home\you\`) for much faster Docker file access.

## 1. One-time repo clean-up
```powershell
git config core.autocrlf input
git rm -r --cached node_modules          # root node_modules was committed by mistake
git add --renormalize .
# remove the old scaffold tests (they target gems/routes that no longer exist)
git rm test/application_system_test_case.rb test/system/users_test.rb test/controllers/users_controller_test.rb test/fixtures/users.yml
```

## 2. Build and regenerate the lockfile (Gemfile changed: sqlite3 -> pg)
```powershell
docker pull ruby:2.7.8-bullseye          # sanity check that the base image exists
docker compose build web
docker compose run --rm web bundle install   # rewrites Gemfile.lock on your disk -> commit it
```

## 3. Run the API + database
```powershell
docker compose up                        # first boot creates, migrates and seeds the DB
```
API: http://localhost:3000/up (health check)

## 4. Run the React app
```powershell
cd client
npm install
npm start                                # http://localhost:4000  (proxies /api to :3000)
```
Seeded login: `admin` / `root` (development only).

## 5. Run the tests (with coverage report in ./coverage)
```powershell
docker compose run --rm -e RAILS_ENV=test web sh -c "bundle exec rails db:create db:schema:load && bundle exec rails test"
```

## 6. Run the production-like container (Rails serving the built React app)
```powershell
docker compose --profile prod up --build web-prod
```
App: http://localhost:8080  — first boot seeds the admin using ADMIN_PASSWORD (default `ChangeMe123!`, override in `.env`).

## 7. Security scans
```powershell
docker compose run --rm web bundle exec brakeman -q --no-pager
docker compose run --rm web bundle exec bundler-audit check --update
cd client; npm audit --omit=dev
```
(Rails 6.1 is end-of-life, so expect findings; that is the case for upgrading.)

## Troubleshooting
- `exec format error` / `\r` errors: line endings; re-run the step 1 commands.
- Port 3000/4000/5433 busy: stop the other process or change the left side of the port mapping.
- Reset the database: `docker compose down -v` (deletes the Postgres volume).
