class Medicine < ApplicationRecord
  has_many :prescriptions, dependent: :destroy
  belongs_to :patient
  belongs_to :doctors

  validates :name, presence: true
  validates :dosage, presence: true
end