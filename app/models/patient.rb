class Patient < ApplicationRecord
    has_many :doctor_appointments
    # has_one :doctor
    has_many :diagnostics
    has_many :diseases
    has_many :prescriptions
    has_many :medicines

    validates :full_name, presence: true
    validates :age, numericality:{greater_than_or_equal_to:0}
    # validates :gender, inclusion: {in: %w[Male, Female, Other]}
end
