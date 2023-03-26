class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :frequency, :duration, :medicine, :disease, :patient, :doctor
end
