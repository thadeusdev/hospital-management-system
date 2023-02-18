class PrescriptionsController < ApplicationController
    # before_action :authorize, :current_user
    
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

        # Nested resource routing
    # start
    # def medicines_index
    #     prescription = Prescription.find(params[:prescription_id])
    #     medicines = prescription.medicines
    #     render json: medicines, include: :prescription
    # end

    # def medicine
    #     medicine = Medicine.find(params[:id])
    #     render json: medicine, include: :prescription
    # end

    # def diseases_index
    #     prescription = Prescription.find(params[:prescription_id])
    #     diseases = prescription.diseases
    #     render json: diseases, include: :prescription
    # end

    # def disease
    #     disease = Disease.find(params[:id])
    #     render json: disease, include: :prescription
    # end

    # def patients_index
    #     prescription = Prescription.find(params[:prescription_id])
    #     patients = prescription.patients
    #     render json: patients, include: :prescription
    # end

    # def patient
    #     patient = Patient.find(params[:id])
    #     render json: patient, include: :prescription
    # end

    # def doctors_index
    #     prescription = Prescription.find(params[:prescription_id])
    #     doctors = prescription.doctors
    #     render json: doctors, include: :prescription
    # end

    # def doctor
    #     doctor = Doctor.find(params[:id])
    #     render json: doctor, include: :prescription
    # end
    # end

    private

    def prescription_params
        params.permit(:frequency, :duration, :medicine_id, :disease_id, :patient_id, :doctor_id)
    end
end
