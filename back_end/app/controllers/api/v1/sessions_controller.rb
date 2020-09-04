module Api
  module V1
    class SessionsController < ApplicationController
      include JwtAuthenticator

      def create
        @current_user = User.find_by(name: params[:name])

        if @current_user && @current_user.authenticate(params[:password])
          jwt_token = encode(@current_user.id)
          response.headers['X-Authentication-Token'] = jwt_token
          render json: @current_user
        else
          raise UnableAuthorizationError.new("ログインIDまたはパスワードが間違っています")
        end
      end
    end
  end
end
