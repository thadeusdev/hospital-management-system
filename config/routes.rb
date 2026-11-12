Rails.application.routes.draw do
  root 'home#index'

  resources :users
  resources :prescriptions
  resources :diagnostics
  resources :medicines
  resources :patients
  resources :diseases
  resources :doctor_appointments
  resources :doctors

  # Inventory — nested under medicines for listing/creating batches
  resources :medicines, only: [] do
    resources :batches, controller: "stock_batches", only: [:index, :create]
  end

  # Stock movements live under a batch
  resources :batches, controller: "stock_batches", only: [] do
    resources :movements, controller: "stock_movements", only: [:create]
  end

  # Alerts (low stock, expiring, expired) and dashboard stats
  get "/alerts", to: "alerts#index"
  get "/stats",  to: "stats#index"

  # Sign-up feature
  post "/signup", to: "users#create"
  # Auto-Login feature
  get "/me", to: "users#show"
  # Login after sign-up
  post "/login", to: "sessions#create"
  # Logout after login
  delete "/logout", to: "sessions#destroy"

  # config/routes.rb
  get "/up", to: "health#show"
end