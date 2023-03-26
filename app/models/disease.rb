class Disease < ApplicationRecord
    has_many :diagnostics, dependent: :destroy
    belongs_to:patient
    has_many :prescriptions

    validates :name, presence: true
end
