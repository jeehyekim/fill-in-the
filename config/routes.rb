Rails.application.routes.draw do
  
  root to: "users#index"

  resources :users

  resources :quizzes, only: [:index, :new, :create, :show, :edit, :update, :destroy] do
  	resources :enrichments
  end

  resources :sessions, only: [:new, :create]

  delete "logout" => "sessions#destroy"

end
