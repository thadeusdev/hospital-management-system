class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    private

    def invalid_record(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def not_found(exception)
        render json: { error: exception.message }, status: :not_found
    end
end
