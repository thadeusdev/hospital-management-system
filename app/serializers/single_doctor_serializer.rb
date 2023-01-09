class SingleDoctorSerializer < ActiveModel::Serializer
  attributes :id, :image, :full_name, :email, :primary_practice, :secondary_practice, :years_of_experience, :doctor_appointments, :patients
end
