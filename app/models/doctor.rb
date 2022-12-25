class Doctor < ApplicationRecord
    has_many :doctor_appointments
    has_many :patients, through: :doctor_appointments
end
