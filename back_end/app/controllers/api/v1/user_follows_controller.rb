'''
	Author: Hiranuma Tomoyuki
	Date: 20200907
'''

module Api
	module V1
		class UserFollowsController < ApplicationController

			# current_user.id == user_id となるレコードをUserFollowから取得
			# 取得したUserFollowレコードのfollow_idでUserを検索
			def index
				@follows_info = User.join(:user_follows).select()
				render json: { status: "SUCCESS", data: { user: @follows_info } }
			end

			def create
				@user_follow = UserFollow.new(user_id: @current_user.id, follow_id: params[:id])
				if @user_follow.save
					render json: { status: 'SUCCESS' }
				else
					render json: { status: 'ERROR' }
				end
			end

			def unfollow
				@user_follow = UserFollow.find_by(user_id: @current_user.id, follow_id: params[:id])
				@user_follow.destroy
				render json: { status: 'SUCCESS' }
			end
		end
	end
end

