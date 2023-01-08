class Diagnostic < ApplicationRecord
    belongs_to :doctor
    belongs_to :patient
    belongs_to :disease
end
