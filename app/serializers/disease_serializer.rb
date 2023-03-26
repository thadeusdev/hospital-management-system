class DiseaseSerializer < ActiveModel::Serializer
  attributes :id, :name, :patient, :symptoms, :severity, :diagnostics
end
