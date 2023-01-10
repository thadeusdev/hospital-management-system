class Prescription < ApplicationRecord
    belongs_to :doctor, optional: true
    belongs_to :patient, optional: true
    belongs_to :medicine, optional: true
    belongs_to :disease, optional: true
end
