class DiagnosticSerializer < ActiveModel::Serializer
  attributes :id, :notes, :disease_id, :patient_id, :diagnosed_on, :pulse, :sugar, :temperature, :pressure
end
