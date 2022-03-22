Rails.application.routes.draw do
  root "musics#index"

  get "/musics", to: "musics#index"
  post "/musics", to: "musics#add"
  get "/musics/:id", to: "musics#play"
  delete "/musics/:id", to: "musics#delete"
  get "/musics/:id/thumbnail", to: "musics#thumbnail"
end
