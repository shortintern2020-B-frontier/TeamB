'''
	Author: Hiranuma Tomoyuki
	Date: 20200907
'''

module Api
	module V1
		class RoomUsersController < ApplicationController
			jwt_authenticate 
			# ルームに入室しているユーザ一覧を取得(入室した順番に取得)

			#Kyosuke Yokota
			def index 
				users = User.where(room_id: @current_user.room_id).order(updated_at: :desc)#rikuiwasaki
				render json: { status: 'SUCCESS', message: 'Loaded posts', data: { users: users } }
			end
			#Kyosuke Yokota
			def create
				if @current_user.update_attribute(:room_id, room_id_params[:room_id])
					render json: { status: "SUCCESS", data: { user: @current_user } }
				else
					render json: { status: "ERROR", data: { user: @current_user } }
				end
			end

			def leave
				if @current_user.update_attribute(:room_id, nil)
					render json: { status: "SUCCESS", data: { user: @current_user } }
				else
					render json: { status: "ERROR", data: { user: @current_user } }
				end
			end
			
			private
			def room_id_params
				params.require(:user).permit(:room_id)
			end

		end
	end
end
