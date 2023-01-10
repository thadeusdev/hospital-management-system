class Medicine < ApplicationRecord
  has_many :prescriptions, dependent: :destroy
  has_many :patients, through: :prescriptions
  has_many :doctors, through: :prescriptions
end