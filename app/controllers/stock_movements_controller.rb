class StockMovementsController < ApplicationController
  def create
    batch = StockBatch.find(params[:batch_id])
    mv = batch.stock_movements.new(movement_params)
    mv.user = User.find_by(id: session[:user_id])
    if mv.save
      render json: { id: mv.id, kind: mv.kind, quantity: mv.quantity,
                     batch_quantity: batch.reload.quantity }, status: :created
    else
      render json: { errors: mv.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def movement_params
    params.permit(:kind, :quantity, :reason)
  end
end