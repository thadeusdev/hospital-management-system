class MedicineSerializer < ActiveModel::Serializer
  attributes :id, :img, :name, :description, :category, :is_acidic, :infant_safe, :patient_id, :disease_id
end
