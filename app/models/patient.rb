class Patient < ApplicationRecord
    has_many :appointments
    has_many :doctors, through: :appointments
    has_many :diagnostics
    has_many :diseases, through: :diagnostics
    has_many :prescriptions
    has_many :medicines, through: :prescriptions
end
