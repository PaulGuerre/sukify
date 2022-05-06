class MiddlewareManager < ApplicationController
    def initialize(app)
        @app = app
    end

    def call(env)
        if env["HTTP_AUTHORIZATION"] == @@token || (env["PATH_INFO"].include? "/src")
            @app.call(env)
        else
            [401, {}, ["unauthorized"]]
        end
    end
end
