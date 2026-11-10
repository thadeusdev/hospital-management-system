class StockBatchesController < ApplicationController
  def index
    med = Medicine.find(params[:medicine_id])
    render json: med.stock_batches.fefo.map { |b|
      { id: b.id, batch_number: b.batch_number, expiry_date: b.expiry_date,
        quantity: b.quantity, days_to_expiry: (b.expiry_date - Date.current).to_i }
    }
  end

  def create
    med = Medicine.find(params[:medicine_id])
    b = med.stock_batches.new(batch_params)
    b.received_at ||= Date.current
    if b.save
      StockMovement.create!(stock_batch: b, kind: "receipt",
                            quantity: b.quantity, reason: "Initial batch load")
      render json: b, status: :created
    else
      render json: { errors: b.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def batch_params
    params.permit(:batch_number, :expiry_date, :quantity, :received_at)
  end
end