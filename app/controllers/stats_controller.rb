class StatsController < ApplicationController
  def index
    render json: {
      counts: {
        doctors:      Doctor.count,
        patients:     Patient.count,
        medicines:    Medicine.count,
        appointments: DoctorAppointment.count,
        prescriptions: Prescription.count
      },
      stock: {
        total_batches: StockBatch.count,
        total_units:   StockBatch.sum(:quantity),
        low_stock:     Medicine.includes(:stock_batches).all.count(&:below_reorder?),
        expiring_90d:  StockBatch.expiring_soon.count,
        expired:       StockBatch.expired.count
      },
      generated_at: Time.current
    }
  end
end