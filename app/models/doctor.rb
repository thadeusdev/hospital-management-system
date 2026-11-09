class Doctor < ApplicationRecord
    validates :full_name, presence: true

    has_many :doctor_appointments
    has_many :patients, through: :doctor_appointments
end
