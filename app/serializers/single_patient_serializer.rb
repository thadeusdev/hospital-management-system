class SinglePatientSerializer < ActiveModel::Serializer
  attributes :id, :image, :full_name, :age, :gender, :address, :visiting_date, :visit_no, :doctors, :doctor_appointments
end
