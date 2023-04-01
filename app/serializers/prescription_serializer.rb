class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :frequency, :duration, :medicine_name, :disease_name, :patient_name, :doctor_name

  def patient_name
    object.patient.full_name
  end

  def doctor_name
    object.doctor.full_name
  end

  def medicine_name
    object.medicine.name
  end

  def disease_name
    object.disease.name
  end
end
