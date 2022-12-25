class Medicine < ApplicationRecord
 belongs_to :disease
 has_many :prescriptions
end