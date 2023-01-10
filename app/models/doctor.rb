class Doctor < ApplicationRecord
    has_many :doctor_appointments, dependent: :destroy
    has_many :patients, through: :doctor_appointments
    has_many :prescriptions, dependent: :destroy
    has_many :medicines, through: :prescriptions
    has_many :diagnostics
end
