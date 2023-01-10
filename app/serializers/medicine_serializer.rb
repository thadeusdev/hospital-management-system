class MedicineSerializer < ActiveModel::Serializer
  attributes :id, :image, :name, :dosage, :patient_id, :description, :category, :is_acidic, :infant_safe, :patients
end
