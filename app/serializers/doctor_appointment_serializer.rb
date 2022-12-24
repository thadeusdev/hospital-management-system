class DoctorAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :notes, :patient_id, :doctor_id
end
