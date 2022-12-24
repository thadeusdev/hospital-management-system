class DiseaseSerializer < ActiveModel::Serializer
  attributes :id, :name, :symptoms, :severity
end
