class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :notes, :medicine_id, :patient_id
end
