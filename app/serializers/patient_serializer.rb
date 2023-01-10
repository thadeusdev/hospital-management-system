class PatientSerializer < ActiveModel::Serializer
  attributes :id, :image, :full_name, :age, :gender, :address, :visiting_date, :visit_no, :doctor_appointments, :medicines, :diseases, :doctors, :diagnostics, :prescriptions
end
