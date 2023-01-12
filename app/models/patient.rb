class Patient < ApplicationRecord
    has_many :doctor_appointments, dependent: :destroy
    has_many :doctors, through: :doctor_appointments
    has_many :diagnostics, dependent: :destroy
    has_many :diseases, through: :diagnostics
    has_many :prescriptions, dependent: :destroy
    has_many :medicines, through: :prescriptions

    validates :full_name, presence: true
    validates :age, numericality:{greater_than_or_equal_to:0}
    validates :gender, inclusion: {in: %w[Male, Female, Other]}
end
