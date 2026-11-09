class DoctorAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :notes, :date, :time, :patient_name, :doctor_name

  def patient_name
    object.patient.full_name
  end

  def doctor_name
    object.doctor.full_name
  end

  def time
    # format the time using strftime
    object.time.strftime("%I:%M%p")
  end
end
