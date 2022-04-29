class ApplicationController < ActionController::Base
    
    def login
        if (params[:username] == ENV["USER"]) && (params[:password] == ENV["PASSWORD"])
            render json: { message: 'success' }
        else
            render json: { message: 'error' }
        end
    end
end
