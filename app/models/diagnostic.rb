class Diagnostic < ApplicationRecord
    belongs_to :disease
    belongs_to :patient
end
