module Api
    module V1
        class RoomsController < ApplicationController
            include JwtAuthenticator 
            jwt_authenticate except: :index
            #rikuiwasaki
            before_action :set_room, only: [:update, :show]
            def index
                rooms = Room.all.order(updated_at: :desc).select(:id, :name, :admin_id, :youtube_id, :password, :is_private,:start_time, :created_at, :updated_at)
                render status:200, json: { status: 'SUCCESS', data: { rooms: rooms } }
            end

            def create
                room_info = room_params
                room_info[:admin_id] = @current_user.id
                room = Room.new(room_info)
                if room.save && @current_user.update_attribute(:room_id, room.id)
                    render status:201, json: { status: 'SUCCESS', data: { room: room, user: @current_user } }
                else 
                    render status:500, json: { status: 'ERROR', data: { error: "save error" } }
                end
            end
            
            def update
                if @current_user.id == @room.admin_id
                    if @room.update(room_params)
                        render status:200, json: { status: 'SUCCESS', data: { room: @room } }
                    else
                        render status:500, json: { status: 'ERROR', data: { error: @room.erros } }
                    end
                else
                    render status:401, json: { status: 'ERROR', data: { error: "invalid user" } }
                end
            end
            
            #karakwa
            def show
                render status:200, json: {status: 'SUCCESS', data: {room: @room}}
            end
            #karakawa

            private
                def set_room
                    @room = Room.find(params[:id])
                end
                def room_params
                    params.require(:room).permit(:name, :youtube_id, :is_private, :start_time, :password)
                end
        #rikuiwasaki
        end
    end
end
