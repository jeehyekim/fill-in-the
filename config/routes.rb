Rails.application.routes.draw do
  
  root to: "users#index"

  resources :users, only: [:new, :create, :show]
  resources :quizzes, only: [:new, :create, :show]
  resources :sessions, only: [:new, :create]


end
