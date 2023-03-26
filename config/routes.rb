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
  
  # Sign-up feature
  post "/signup", to: "users#create"
  # Auto-Login feature
  get "/me", to: "users#show"
  # Login after sign-up
  post "/login", to: "sessions#create"
  # Logout after login
  delete "/logout", to: "sessions#destroy"
end
