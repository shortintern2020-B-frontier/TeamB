'''
	Author: Hiranuma Tomoyuki
	Date: 20200907
'''

module Api
	module V1
		class RoomUsersController < ApplicationController
			jwt_authenticate

			def create
				if @current_user.update_attribute(:room_id, room_id_params[:room_id])
					render json: { status: "SUCCESS", data: { user: @current_user } }
				else
					render json: { status: "ERROR", data: { user: @current_user } }
				end
			end

			def destroy
				@current_user.room_id = nil
				if @current_user.save
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
