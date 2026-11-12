class Patient < ApplicationRecord
  validates :full_name, presence: true
  validates :address, presence: true
  validates :age, numericality: { greater_than_or_equal_to: 0 }

  has_many :doctor_appointments, dependent: :destroy
  has_many :diagnostics,         dependent: :destroy
  has_many :diseases,            dependent: :destroy
  has_many :prescriptions,       dependent: :destroy

end