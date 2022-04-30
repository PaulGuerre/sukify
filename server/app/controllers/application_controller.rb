class ApplicationController < ActionController::Base
    include JWTSessions::RailsAuthorization

    @@token = JWT.encode({ username: "root" }, 'secret', 'HS256')

    def token
        if params[:token] == @@token
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end

    def login
        if (params[:username] == "root") && (params[:password] == "root")
            render json: { message: 'success', token: @@token }
        else
            render json: { message: 'error' }
        end
    end
end
