class Medicine < ApplicationRecord
  has_many :prescriptions, dependent: :destroy
  has_many :stock_batches, dependent: :destroy
  has_many :stock_movements, through: :stock_batches

  validates :name, presence: true
  validates :dosage, presence: true
  validates :reorder_level, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  def total_quantity
    stock_batches.where("expiry_date > ?", Date.current).sum(:quantity)
  end

  def below_reorder?
    total_quantity < (reorder_level || 0)
  end
end