class DiagnosticSerializer < ActiveModel::Serializer
  attributes :id, :name, :patient_id, :doctor_id, :disease_id, :performed_at, :pulse, :sugar, :temperature, :pressure
end
