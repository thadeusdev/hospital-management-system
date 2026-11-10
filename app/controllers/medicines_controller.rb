class MedicinesController < ApplicationController
  before_action :set_medicine, only: [:show, :update, :destroy]

  def index
    meds = Medicine.includes(:stock_batches).order(:name)
    render json: meds.map { |m| serialize(m) }
  end

  def show
    render json: serialize(@medicine, detailed: true)
  end

  def create
    m = Medicine.new(medicine_params)
    if m.save
      render json: serialize(m), status: :created
    else
      render json: { errors: m.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @medicine.update(medicine_params)
      render json: serialize(@medicine)
    else
      render json: { errors: @medicine.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @medicine.destroy
    head :no_content
  end

  private

  def set_medicine
    @medicine = Medicine.find_by(id: params[:id])
    render json: { error: "Not found" }, status: :not_found unless @medicine
  end

  def medicine_params
    params.permit(:name, :dosage, :description, :category, :image,
                  :is_acidic, :infant_safe, :reorder_level, :unit)
  end

  def serialize(m, detailed: false)
    base = {
      id: m.id, name: m.name, dosage: m.dosage, description: m.description,
      category: m.category, unit: m.unit, reorder_level: m.reorder_level,
      total_quantity: m.total_quantity, below_reorder: m.below_reorder?,
      batches_count: m.stock_batches.count
    }
    return base unless detailed
    base.merge(
      batches: m.stock_batches.fefo.map do |b|
        { id: b.id, batch_number: b.batch_number, expiry_date: b.expiry_date,
          quantity: b.quantity, days_to_expiry: (b.expiry_date - Date.current).to_i }
      end
    )
  end
end