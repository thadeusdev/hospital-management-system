class Patient < ApplicationRecord
    has_many :doctor_appointments, dependent: :destroy
    has_many :doctors, through: :doctor_appointments
    has_many :diagnostics, dependent: :destroy
    has_many :diseases, through: :diagnostics
    has_many :prescriptions, dependent: :destroy
    has_many :medicines, through: :prescriptions
end
