'''
	Author: Hiranuma Tomoyuki
	Date: 20200907
'''

module Api
  module V1
    class RelationshipsController < ApplicationController
      include JwtAuthenticator
      jwt_authenticate
      before_action :set_user

      def index
        @followings = @current_user.followings
        render status:200, json: { status: "SUCCESS", data: { users: @followings } }
      end

      def create
        if @user == nil 
          render status:500, json: { status: 'ERROR', data: { error: "INPUT NAME AND PASSWORD" } }
        else 
          @following = @current_user.follow(@user)
          if @following.save
            render status:201, json: { status: 'SUCCESS' }
          else
            render status:500, json: { status: 'ERROR', data: { error: @following.errors } }
          end
        end
      end

      def destroy
        @following = @current_user.unfollow(@user)
        if @following.destroy
          render status:204, json: { status: 'SUCCESS' }
        else
          render status:500, json: { status: 'ERROR', data: { error: @following.errors } }
        end
      end

      private

      def set_user
        @user = User.find_by(id: params[:follow_id])
      end
    end
  end
end