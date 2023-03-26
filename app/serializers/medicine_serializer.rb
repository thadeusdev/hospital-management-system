class MedicineSerializer < ActiveModel::Serializer
  attributes :id, :image, :name, :dosage, :patient, :description, :category, :is_acidic, :infant_safe, :prescriptions, :doctors
end
