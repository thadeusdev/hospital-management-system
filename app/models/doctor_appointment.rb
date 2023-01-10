class DoctorAppointment < ApplicationRecord
    belongs_to :doctor, optional: true
    belongs_to :patient, optional: true
end
