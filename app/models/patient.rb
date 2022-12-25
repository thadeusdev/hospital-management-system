class Patient < ApplicationRecord
    has_many :doctor_appointments
    has_many :doctors, through: :doctor_appointments

    has_many :diagnostics
    has_many :diseases, through: :diagnostics
end
