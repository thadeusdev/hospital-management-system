class AlertsController < ApplicationController
  def index
    today = Date.current
    low = Medicine.includes(:stock_batches).all.select(&:below_reorder?)
    expiring = StockBatch.expiring_soon.includes(:medicine)
    expired  = StockBatch.expired.includes(:medicine)

    render json: {
      low_stock: low.map { |m| { id: m.id, name: m.name,
                                 total_quantity: m.total_quantity,
                                 reorder_level: m.reorder_level } },
      expiring_soon: expiring.map { |b| { id: b.id, medicine: b.medicine.name,
                                          batch_number: b.batch_number,
                                          expiry_date: b.expiry_date,
                                          quantity: b.quantity,
                                          days_to_expiry: (b.expiry_date - today).to_i } },
      expired: expired.map { |b| { id: b.id, medicine: b.medicine.name,
                                   batch_number: b.batch_number,
                                   expiry_date: b.expiry_date,
                                   quantity: b.quantity } },
      generated_at: Time.current
    }
  end
end