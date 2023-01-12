class Medicine < ApplicationRecord
  has_many :prescriptions, dependent: :destroy
  has_many :patients, through: :prescriptions
  has_many :doctors, through: :prescriptions

  validates :name, presence: true
  validates :dosage, presence: true
end