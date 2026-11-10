class StockBatch < ApplicationRecord
  belongs_to :medicine
  has_many :stock_movements, dependent: :restrict_with_error

  validates :batch_number, presence: true
  validates :expiry_date,  presence: true
  validates :quantity,     numericality: { greater_than_or_equal_to: 0 }
  validates :batch_number, uniqueness: { scope: :medicine_id }

  scope :expiring_soon, -> { where(expiry_date: Date.current..(Date.current + 90.days)) }
  scope :expired,       -> { where("expiry_date <= ?", Date.current) }
  scope :fefo,          -> { order(:expiry_date) }
end