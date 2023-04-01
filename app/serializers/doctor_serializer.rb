class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :image, :full_name, :email, :primary_practice, :secondary_practice, :years_of_experience, :diagnostics, :doctor_appointments, :prescriptions
end
