class StockMovement < ApplicationRecord
  belongs_to :stock_batch
  belongs_to :user, optional: true

  KINDS = %w[receipt issue adjustment].freeze

  validates :kind,     inclusion: { in: KINDS }
  validates :quantity, numericality: { other_than: 0 }

  before_validation :normalize_sign
  after_create :apply_to_batch

  private

  def normalize_sign
    self.quantity = -quantity.abs if kind == "issue"
    self.quantity =  quantity.abs if kind == "receipt"
  end

  def apply_to_batch
    new_qty = stock_batch.quantity + quantity
    raise ActiveRecord::Rollback, "Insufficient stock" if new_qty < 0
    stock_batch.update!(quantity: new_qty)
  end
end