Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins '*'
        resource '/play',
            headers: :any,
            methods: [:get]

        resource '/dl',
            headers: :any,
            methods: [:get, :post]
    end
end
