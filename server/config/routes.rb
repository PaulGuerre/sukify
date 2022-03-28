Rails.application.routes.draw do
  root "musics#index"

  get "/musics", to: "musics#index"
  get "/musics/:id", to: "musics#play"
  post "/musics", to: "musics#add"
  delete "/musics/:id", to: "musics#delete"
end
