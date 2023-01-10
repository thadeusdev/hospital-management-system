class DiagnosticsController < ApplicationController
    # GET /diagnostics
    def index
        diagnostics = Diagnostic.all
        render json: diagnostics, status: :ok
    end

    # GET /diagnostics/:id
    def show
        diagnostic = Diagnostic.find_by(id: params[:id])
        if diagnostic
            render json: diagnostic, status: :ok
        else
            render json: { error: "Diagnose not found" }, status: :not_found
        end
    end

    # POST /diagnostics
    def create
        diagnostic = Diagnostic.create(diagnostic_params)
        render json: diagnostic, status: :created
    end

    # PATCH /diagnostics/:id
    def update
        diagnostic = Diagnostic.find_by(id: params[:id])
        if diagnostic
            diagnostic.update(diagnostic_params)
            render json: diagnostic, status: :accepted
        else
            render json: { error: "Diagnose not found" }, status: :not_found
        end
    end

    # DELETE /diagnostics/:id
    def destroy
        diagnostic = Diagnostic.find_by(id: params[:id])
        if diagnostic
            diagnostic.destroy
            head :no_content
        else
            render json: { error: "Diagnose not found" }, status: :not_found
        end
    end

    # Nested resource routing
    # start
    def patients_index
        diagnostic = Diagnostic.find(params[:diagnostic_id])
        patients = diagnostic.patients
        render json: patients, include: :diagnostic
    end

    def patient
        patient = Patient.find(params[:id])
        render json: patient, include: :diagnostic
    end

    def doctors_index
        diagnostic = Diagnostic.find(params[:diagnostic_id])
        doctors = diagnostic.doctors
        render json: doctors, include: :diagnostic
    end

    def doctor
        doctor = Doctor.find(params[:id])
        render json: doctor, include: :diagnostic
    end

    def diseases_index
        diagnostic = Diagnostic.find(params[:diagnostic_id])
        diseases = diagnostic.diseases
        render json: diseases, include: :diagnostic
    end

    def disease
        disease = Disease.find(params[:id])
        render json: disease, include: :diagnostic
    end
    # ends

    private

    def diagnostic_params
        params.permit(:name, :patient_id, :doctor_id, :disease_id, :performed_at, :pulse, :sugar, :temperature, :pressure)
    end
end
