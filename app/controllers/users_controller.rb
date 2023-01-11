class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]
    
    # GET /users
    def index
        users = User.all
        render json: users
    end

    # GET /users/:id
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {errors: ["Not Authorized"]}, status: :unauthorized
        end
    end

    # POST /users
    def create
        user = User.new(user_params)
        if user.valid?
            session[:user_id] = user.id
            user.save
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

end
