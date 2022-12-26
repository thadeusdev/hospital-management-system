class DiagnosticSerializer < ActiveModel::Serializer
  attributes :id, :notes, :disease, :patient, :diagnosed_on, :pulse, :sugar, :temperature, :pressure
end
