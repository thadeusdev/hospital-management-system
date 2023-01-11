class PrescriptionsController < ApplicationController
    before_action :authorize, :current_user
    
    # GET /prescriptions
    def index
        prescriptions = Prescription.all
        render json: prescriptions
    end

    # GET /prescriptions/:id
    def show
        prescription = Prescription.find_by(id: params[:id])
        render json: prescription
    end

    # POST /prescriptions
    def create
        prescription = Prescription.create(prescription_params)
        render json: prescription, status: :created
    end

    # PATCH /prescriptions/:id
    def update
        prescription = Prescription.find_by(id: params[:id])
        if prescription
            prescription.update(prescription_params)
            render json: prescription
        else
            render json: { error: "Prescription not found" }, status: :not_found
        end
    end

    # DELETE /prescriptions/:id
    def destroy
        prescription = Prescription.find_by(id: params[:id])
        if prescription
            prescription.destroy
            head :no_content
        else
            render json: { error: "Prescription not found" }, status: :not_found
        end
    end

    private

    def prescription_params
        params.permit(:frequency, :duration, :medicine_id, :disease_id, :patient_id, :doctor_id)
    end
end
