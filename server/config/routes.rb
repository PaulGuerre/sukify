Rails.application.routes.draw do
  #root "test#index"

  get "/play", to: "test#play"

  post "/dl", to: "dl#dl"
end
