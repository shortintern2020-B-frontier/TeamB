module Api
    module V1
        class RoomsController < ApplicationController
            before_action :set_room,only: [:update]
            def index
                rooms = Room.all.order(updated_at: :desc)
                render json: { status: 'SUCCESS',data: {
                    rooms: rooms } }
            end
            def create
                room=Room.new(room_params)
                if room.save
                    render json: { status: 'SUCCESS', data: { room: room } }
                else 
                    render json: { status: 'ERROR', data: { error: errors }}
                end
            end
            def update
                if @room.password.eql?(room_params[:password])
                    if @room.update(room_params)
                        render json: { status: 'SUCCESS', data: { room: @room } }
                    else
                        render json: { status: 'ERROR', data: { error: @room.erros}}
                    end
                else
                    render json: { status: 'ERROR', data: { error: "password is wrong"}}
                end
            end
            private
                def set_room
                    @room=Room.find(params[:id])
                end
                def room_params
                    params.require(:room).permit(:name,:youtube_id,:admin_id,:is_private,:start_time,:password)
                end
        end
    end
end
