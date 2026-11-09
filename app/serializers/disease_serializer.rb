class DiseaseSerializer < ActiveModel::Serializer
  attributes :id, :name, :patient_name, :symptoms, :severity

  def patient_name
    object.patient.full_name
  end
end
