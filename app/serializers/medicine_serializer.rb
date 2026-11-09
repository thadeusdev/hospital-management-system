class MedicineSerializer < ActiveModel::Serializer
  attributes :id, :image, :name, :dosage, :patient_name, :description, :category, :is_acidic, :infant_safe

  def patient_name
    object.patient.full_name
  end
end
