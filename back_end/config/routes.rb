'''
  Author: Yokota Kyosuke
'''

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace 'api' do
    namespace 'v1' do
      resources :users
      resources :rooms do
        resources :chats
      end
      resources :user_tags
      resources :room_tags
      resources :room_users do
        collection do 
          get :leave 
        end
      end
      resources :tags do
        collection do
          get :search
        end
      end
      resources :hello
      resources :relationships, only: [:create, :destroy, :index]
      resources :user_room_tags, only:[:show]
      # get "tags/search_tag" => "tags#search_tag"
      post "login" => "sessions#create"  # Hiranuma
      delete "logout" => "sessions#destroy"  # Hiranuma
      
    end
  end
end
