class PatientsController < ApplicationController
    # GET /patients
    def index
        patients = Patient.all
        render json: patients
    end

    # GET /patients/:id
    def show
        patient = Patient.find_by(id: params[:id])
        render json: patient, serializer: OnePatientSerializer
    end

    # POST /patients
    def create
        patient = Patient.create(patient_params)
        render json: patient, status: :created
    end

    # PATCH /patients/:id
    def update
        patient = Patient.find_by(id: params[:id])
        if patient
            patient.update(patient_params)
            render json: patient
        else
            render json: { error: "Patient not found" }, status: :not_found
        end
    end

    # DELETE /patients/:id
    def destroy
        patient = Patient.find_by(id: params[:id])
        if patient
            patient.destroy
            head :no_content
        else
            render json: { error: "Patient not found" }, status: :not_found
        end
    end

    private

    def patient_params
        params.permit(:img, :full_name, :address, :visiting_date, :visit_no)
    end
end
