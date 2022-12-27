class DoctorAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :notes, :patient, :doctor
end
