# app/controllers/health_controller.rb
class HealthController < ApplicationController
  def show
    head :ok
  end
end