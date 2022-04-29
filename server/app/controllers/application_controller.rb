class ApplicationController < ActionController::Base
    
    def login
        render json: { "user": ENV["USER"], "password": ENV["PASSWORD"] }
    end
end
