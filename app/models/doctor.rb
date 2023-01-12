class Doctor < ApplicationRecord
    has_many :doctor_appointments, dependent: :destroy
    has_many :patients, through: :doctor_appointments
    has_many :prescriptions, dependent: :destroy
    has_many :medicines, through: :prescriptions
    has_many :diagnostics

    validates :full_name, presence: true
    validates :primary_practice, presence: true
    validates :years_of_experience, numericality:{greater_than_or_equal_to:0}
end
