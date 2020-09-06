'''
  author: Hiranuma Tomoyuki
  Date: 20200904
'''

module Api
  module V1
    class SessionsController < ApplicationController
      include JwtAuthenticator

      def create
        @current_user = User.find_by(name: params[:name])

        if @current_user && @current_user.authenticate(params[:password])
          jwt_token = encode(@current_user.id)
          response.headers['X-Authentication-Token'] = jwt_token
          render json: { status: "SUCCESS", data: @current_user, token: jwt_token }
        else
          render json: { status: 'ERROR' }
        end
      end
    end
  end
end
