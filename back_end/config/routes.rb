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
      resources :room_users
      resources :tags
      resources :hello
      post "login" => "sessions#create"
      delete "logout" => "sessions#destroy"
      
    end
  end
end
