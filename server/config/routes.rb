Rails.application.routes.draw do
  root "musics#index"

  get "/musics", to: "musics#index"
  get "/musics/:id", to: "musics#show"
  get "/musics/:id/src", to: "musics#play"
  get "/musics/:id/videoID", to: "musics#videoID"
  post "/musics", to: "musics#add"
  delete "/musics/:id", to: "musics#delete"
  put "/musics/:id", to: "musics#update"

  get "/playlists", to: "playlists#index"
  get "/playlists/:id", to: "playlists#show"
  get "/playlists/:id/musics", to: "playlists#musics"
  post "/playlists", to: "playlists#add"
  post "/playlists/:id", to: "playlists#addMusic"
  delete "/playlists/:id", to: "playlists#delete"
  delete "/playlists/:id/musics/:music_id", to: "playlists#deleteMusic"
  put "/playlists/:id", to: "playlists#update"
  
  post "/login", to: "application#login"
end
