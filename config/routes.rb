Rails.application.routes.draw do
  resources :prescriptions
  resources :diagnostics
  resources :medicines
  resources :patients
  resources :diseases
  resources :doctor_appointments
  resources :doctors
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
