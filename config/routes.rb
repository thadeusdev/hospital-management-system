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

  get '/medicines/:medicine_id/patients', to: 'medicines#patients_index'
  get '/medicines/:medicine_id/patients/:id', to: 'medicines#patient'

  get '/doctor_appointments/:doctor_appointment_id/patients', to: 'doctor_appointments#patients_index'
  get '/doctor_appointments/:doctor_appointment_id/patients/:id', to: 'doctor_appointments#patient'

  get '/doctor_appointments/:doctor_appointment_id/doctors', to: 'doctor_appointments#doctors_index'
  get '/doctor_appointments/:doctor_appointment_id/doctors/:id', to: 'doctor_appointments#doctor'

  get '/diagnostics/:diagnostic_id/patients', to: 'diagnostics#patients_index'
  get '/diagnostics/:diagnostic_id/patients/:id', to: 'diagnostics#patient'

  get '/diagnostics/:diagnostic_id/doctors', to: 'diagnostics#doctors_index'
  get '/diagnostics/:diagnostic_id/doctors/:id', to: 'diagnostics#doctor'

  get '/diagnostics/:diagnostic_id/diseases', to: 'diagnostics#diseases_index'
  get '/diagnostics/:diagnostic_id/diseases/:id', to: 'diagnostics#disease'

  get '/prescriptions/:prescription_id/medicines', to: 'prescriptions#medicines_index'
  get '/prescriptions/:prescription_id/medicines/:id', to: 'prescriptions#medicine'

  get '/prescriptions/:prescription_id/diseases', to: 'prescriptions#diseases_index'
  get '/prescriptions/:prescription_id/diseases/:id', to: 'prescriptions#disease'

  get '/prescriptions/:prescription_id/patients', to: 'prescriptions#patients_index'
  get '/prescriptions/:prescription_id/patients/:id', to: 'prescriptions#patient'

  get '/prescriptions/:prescription_id/doctors', to: 'prescriptions#doctors_index'
  get '/prescriptions/:prescription_id/doctors/:id', to: 'prescriptions#doctor'

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
