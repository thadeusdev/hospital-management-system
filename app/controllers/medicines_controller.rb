class MedicinesController < ApplicationController
    # before_action :authorize, :current_user
    
    # GET /medicines
    def index
        medicines = Medicine.all
        render json: medicines
    end

    # GET /medicines/:id
    def show
        medicine = Medicine.find_by(id: params[:id])
        render json: medicine
    end

    # POST /medicines
    def create
        medicine = Medicine.create!(medicine_params)
        render json: medicine, status: :created
    end

     # PATCH /medicines/:id
     def update
        medicine = Medicine.find_by(id: params[:id])
        if medicine
            medicine.update(medicine_params)
            render json: medicine
        else
            render json: { error: "Medicine not found" }, status: :not_found
        end
    end

    # DELETE /medicines/:id
    def destroy
        medicine = Medicine.find_by(id: params[:id])
        if medicine
            medicine.destroy
            head :no_content
        else
            render json: { error: "Medicine not found" }, status: :not_found
        end
    end

    private

    def medicine_params
        params.permit(:image, :name, :dosage, :patient_id, :description, :category, :is_acidic, :infant_safe)
    end
end
