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

    private

    def diagnostic_params
        params.permit(:name, :patient_id, :doctor_id, :disease_id, :performed_at, :pulse, :sugar, :temperature, :pressure)
    end
end
