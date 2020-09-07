module Api
    module V1
        class RoomsController < ApplicationController
            include JwtAuthenticator 
            jwt_authenticate except: :index
            #rikuiwasaki
            before_action :set_room,only: [:update]
            def index
                rooms = Room.all.order(updated_at: :desc)
                render json: { status: 'SUCCESS',data: {
                    rooms: rooms } }
            end
            def create
                room_info=room_params
                room_info[:admin_id]= @current_user.id
                room=Room.new(room_info)
                if room.save && @current_user.update_attribute(:room_id, room.id)
                    render json: { status: 'SUCCESS', data: { room: room, user: @current_user} }
                else 
                    render json: { status: 'ERROR', data: { error: "error" }}
                end
            end
            def update
                if @current_user.id == @room.admin_id
                    if @room.update(room_params)
                        render json: { status: 'SUCCESS', data: { room: @room } }
                    else
                        render json: { status: 'ERROR', data: { error: @room.erros}}
                    end
                else
                    render json: { status: 'ERROR', data: { error: "invalid user"}}
                end
            end
            private
                def set_room
                    @room=Room.find(params[:id])
                end
                def room_params
                    params.require(:room).permit(:name,:youtube_id,:is_private,:start_time,:password)
                end
        #rikuiwasaki
        end
    end
end
