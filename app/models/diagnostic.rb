class Diagnostic < ApplicationRecord
    validates :disease_id, presence: true
    validates :patient_id, presence: true

    belongs_to :disease
    belongs_to :patient
end
