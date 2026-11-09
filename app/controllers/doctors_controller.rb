class DoctorsController < ApplicationController
    # GET /doctors
    def index
        doctors = Doctor.all
        render json: doctors
    end

    # GET /doctors/:id
    def show
        doctor = Doctor.find_by(id: params[:id])
        render json: doctor, serializer: SingleDoctorSerializer
    end

    # POST /doctors
    def create
        doctor = Doctor.new(doctor_params)
        if doctor.save
            render json: doctor, status: :created
        else
            render json: { errors: doctor.errors.full_messages }, status: :unprocessable_entity
        end
    end

     # PATCH /doctors/:id
    def update
        doctor = Doctor.find_by(id: params[:id])
        if doctor
            if doctor.update(doctor_params)
                render json: doctor
            else
                render json: { errors: doctor.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { error: "Doctor not found" }, status: :not_found
        end
    end

    # DELETE /doctors/:id
    def destroy
        doctor = Doctor.find_by(id: params[:id])
        if doctor
            doctor.destroy
            head :no_content
        else
            render json: { error: "Doctor not found" }, status: :not_found
        end
    end

    private

    def doctor_params
        params.permit(:full_name, :primary_practice, :secondary_practice)
    end
end
