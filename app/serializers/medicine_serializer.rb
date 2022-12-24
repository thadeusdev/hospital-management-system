class MedicineSerializer < ActiveModel::Serializer
  attributes :id, :name, :patient_id, :disease_id
end
