Rails.application.routes.draw do
  root "musics#index"

  get "/musics", to: "musics#index"
  get "/musics/:id", to: "musics#play"
  get "/musics/:id/videoID", to: "musics#videoID"
  post "/musics", to: "musics#add"
  delete "/musics/:id", to: "musics#delete"
  put "/musics/:id", to: "musics#update"
end
