class DiagnosticSerializer < ActiveModel::Serializer
  attributes :id, :name, :patient_name, :doctor_name, :disease_name, :performed_at, :pulse, :sugar, :temperature, :pressure

  def patient_name
    object.patient.full_name
  end

  def doctor_name
    object.doctor.full_name
  end

  def disease_name
    object.disease.name
  end

  def performed_at
    # format the time using strftime
    object.performed_at.strftime("%I:%M%p")
  end
end
