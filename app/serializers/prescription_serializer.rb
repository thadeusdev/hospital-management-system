class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :frequency, :duration, :medicine_id, :disease_id, :patient_id, :doctor_id
end
