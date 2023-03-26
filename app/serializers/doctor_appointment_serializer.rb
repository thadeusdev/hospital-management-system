class DoctorAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :notes, :date, :time, :patient, :doctor

  def time
    # format the time using strftime
    object.time.strftime("%I:%M%p")
  end
end
