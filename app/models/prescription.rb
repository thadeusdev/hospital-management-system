class Prescription < ApplicationRecord
    validates :patient_id, presence: true
    validates :medicine_id, presence: true

    belongs_to :patient
    belongs_to :medicine
end
