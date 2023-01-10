class DoctorAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :notes, :date, :time, :patient_id, :doctor_id, :patient, :doctor
end
