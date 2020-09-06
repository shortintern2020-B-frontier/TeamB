'''
	Author: Hiranuma Tomoyuki
	Date: 20200907
'''

module Api
  module V1
    class RelationshipsController < ApplicationController
      include JwtAuthenticator
      before_action :set_user

      def create
        @following = @current_user.follow(@user)
        if @following.save
          render json: { status: 'SUCCESS' }
        else
          render json: { status: 'ERROR' }
        end
      end

      def destroy
        @following = @current_user.unfollow(@user)
        if @following.destroy
          render json: { status: 'SUCCESS' }
        else
          render json: { status: 'ERROR' }
        end
      end

      private

      def set_user
        @user = User.find_by(id: params[:follow_id])
      end
    end
  end
end