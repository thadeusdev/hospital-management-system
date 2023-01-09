class Prescription < ApplicationRecord
    belongs_to :doctor
    belongs_to :patient
    belongs_to :medicine
end
