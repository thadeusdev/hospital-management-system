class DoctorAppointment < ApplicationRecord
    belongs_to :doctor, optional: true
    belongs_to :patient, optional: true

    validates :date, presence: true
    validates :time, presence: true
    validates :doctor_id, presence: true
    validates :patient_id, presence: true
end
