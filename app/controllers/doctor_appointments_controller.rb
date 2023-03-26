class DoctorAppointmentsController < ApplicationController
    # before_action :authorize, :current_user
    
    # GET /doctor_appointments
    def index
        doctor_appointments = DoctorAppointment.all
        render json: doctor_appointments
    end

    # GET /doctor_appointments/:id
    def show
        doctor_appointment = DoctorAppointment.find_by(id: params[:id])
        render json: doctor_appointment
    end

    # POST /doctor_appointments
    def create
        doctor_appointment = DoctorAppointment.create(doctor_appointment_params)
        render json: doctor_appointment, status: :created
    end

    # PATCH /doctor_appointments/:id
    def update
        doctor_appointment = DoctorAppointment.find_by(id: params[:id])
        if doctor_appointment
            doctor_appointment.update(doctor_appointment_params)
            render json: doctor_appointment
        else
            render json: { error: "Doctor Appointment not found" }, status: :not_found
        end
    end

    # DELETE /doctor_appointments/:id
    def destroy
        doctor_appointment = DoctorAppointment.find_by(id: params[:id])
        if doctor_appointment
            doctor_appointment.destroy
            head :no_content
        else
            render json: { error: "Doctor Appointment not found" }, status: :not_found
        end
    end

    private

    def doctor_appointment_params
        params.require(:doctor_appointment).permit(:notes, :date, :time, :patient_id, :doctor_id)
    end
end
