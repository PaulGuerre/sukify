class MiddlewareManager < ApplicationController
    def initialize(app)
        @app = app
    end

    def call(env)
        if env["HTTP_AUTHORIZATION"] == @@token || ( (env["PATH_INFO"].include? "/src") && (Music.exists?(env["PATH_INFO"].gsub(/^\D+|\D+$/, ""))) )
            @app.call(env)
        else
            [401, {}, ["unauthorized"]]
        end
    end
end
