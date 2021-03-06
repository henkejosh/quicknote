Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy, :new]
    resources :users, only: [:create, :update, :new, :show]

    resources :notebooks
    resources :notes do
      resources :tags, except: [:index, :show, :destroy]
    end

    resources :tags, only: [:index, :show, :destroy]

    # resources :notes_tags

    # resources :notes_tags, only: [:create, :destroy]


  end
end
