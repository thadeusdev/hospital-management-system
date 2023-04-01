class Medicine < ApplicationRecord
  has_many :prescriptions, dependent: :destroy
  belongs_to :patient

  validates :name, presence: true
  validates :dosage, presence: true
end