class Prescription < ApplicationRecord
  belongs_to :doctor, optional: true
  belongs_to :patient, optional: true
  belongs_to :medicine, optional: true
  belongs_to :disease, optional: true

  validates :patient_id, presence: true
  validates :medicine_id, presence: true

  after_create :deduct_stock

  private

  def deduct_stock
    return unless medicine
    batch = medicine.stock_batches.fefo.where("quantity > 0").first
    return unless batch
    StockMovement.create!(
      stock_batch: batch,
      kind: "issue",
      quantity: 1,
      reason: "Prescription ##{id}"
    )
  end
end