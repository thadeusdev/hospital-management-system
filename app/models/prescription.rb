class Prescription < ApplicationRecord
    belongs_to :patient
    belongs_to :medicine
end
