class Diagnostic < ApplicationRecord
    belongs_to :disease, optional: true
    belongs_to :patient, optional: true
    belongs_to :doctor, optional: true

    validates :name, presence: true
    validates :patient_id, presence: true
    validates :disease_id, presence: true
end
