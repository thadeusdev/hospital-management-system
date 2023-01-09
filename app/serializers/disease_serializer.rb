class DiseaseSerializer < ActiveModel::Serializer
  attributes :id, :name, :patient_id, :symptoms, :severity
end
