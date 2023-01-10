Rails.application.routes.draw do
  resources :users
  resources :prescriptions
  resources :diagnostics
  resources :medicines
  resources :patients
  resources :diseases
  resources :doctor_appointments
  resources :doctors

  # get '/diseases/:disease_id/patients', to: 'deseases#patients_index'
  # get '/diseases/:disease_id/patients/:id', to: 'diseases#patient'

  resources :diseases, only: [:show] do
    # nested resource for patients
    resources :patients, only: [:show, :index]
  end
  
  # Sign-up feature
  post "/signup", to: "users#create"
  # Auto-Login feature
  get "/me", to: "users#show"
  # Login after sign-up
  post "/login", to: "sessions#create"
  # Logout after login
  delete "/logout", to: "sessions#destroy"
end
