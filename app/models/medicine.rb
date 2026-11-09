class Medicine < ApplicationRecord
    validates :name, presence: true

    belongs_to :disease
    has_many :prescriptions
end