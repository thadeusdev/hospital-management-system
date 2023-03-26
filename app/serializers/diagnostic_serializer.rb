class DiagnosticSerializer < ActiveModel::Serializer
  attributes :id, :name, :patient, :doctor, :disease, :performed_at, :pulse, :sugar, :temperature, :pressure

  def performed_at
    # format the time using strftime
    object.performed_at.strftime("%I:%M%p")
  end
end
