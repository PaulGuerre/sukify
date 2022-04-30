Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'http://localhost:8080'
        resource '/musics',
            headers: :any,
            methods: [:get, :post, :delete, :put]
        resource '/playlists',
            headers: :any,
            methods: [:get, :post, :delete, :put]
        resource '/token',
            headers: :any,
            methods: [:post]
        resource '/login',
            headers: :any,
            methods: [:post]
    end
end
