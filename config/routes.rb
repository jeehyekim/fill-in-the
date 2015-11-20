Rails.application.routes.draw do
  
  root to: "users#index"

  resources :users
  resources :quizzes, only: [:new, :create, :show]
  resources :sessions, only: [:new, :create]

  delete "logout" => "sessions#destroy"

end
