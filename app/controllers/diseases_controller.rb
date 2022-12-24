class DiseasesController < ApplicationController
    # GET /diseases
    def index
        diseases = Disease.all
        render json: diseases
    end

    # GET /diseases/:id
    def show
        disease = Disease.find_by(id: params[:id])
        render json: disease
    end

    # POST /diseases
    def create
        disease = Disease.create(disease_params)
        render json: disease, status: :created
    end

    # PATCH /diseases/:id
    def update
        disease = Disease.find_by(id: params[:id])
        if disease
            disease.update(disease_params)
            render json: disease
        else
            render json: { error: "Disease not found" }, status: :not_found
        end
    end

    # DELETE /diseases/:id
    def destroy
        disease = Disease.find_by(id: params[:id])
        if disease
            disease.destroy
            head :no_content
        else
            render json: { error: "Disease not found" }, status: :not_found
        end
    end

    private

    def disease_params
        params.permit(:name, :symptoms, :severity)
    end
end
