'''
  Author: Kyosuke Yokota
  Date: 20200904
'''

module Api
    module V1
        class RoomTagsController < ApplicationController
            include JwtAuthenticator
            jwt_authenticate
            before_action :set_tag,only: [:show]

            def create
                room_tag = RoomsTag.new(room_tag_params)
                if room_tag.save
                    render json: { status: 'SUCCESS', data: { room_tag: room_tag } }
                else
                    render json: { status: 'ERROR', data: { error: room_tag.errors } }
                end
            end

            #karakawa

            def destroy #Roomを:idで指定、tag_idをparamとして受け付ける
                # room_id = params[:id]
                room = Room.find_by(id: params[:id])
                # tag_id = tag_id_param[:tag_id]
                # render json:{room: room}
                # これテーブル全削除？の場合かな？ kyosukeに任せる！
                if room.tags.where(tag_id_param).delete
                    render status:200, json:{status: 'SUCCESS'}
                else
                    render status:500, json: {status: 'ERROR'}
                end 
                # tag_id = tag_id_param[:tag_id]
                # room_tag = RoomsTag.find_by(tag_id: tag_id , room_id: room_id)
                # render json: {room_tag: room_tag}
                # , room_id: room_id, tag_id: tag_id}
                # if room_tag.destroy
                #     render status:200, json: {status: 'SUCCESS'}
                # else
                #     render status:500, json: {status: 'ERROR'}
                # end 
            end

            
            #指定されたTag_idを持つroomを返す
            def show
                tag_id = @tag.id
                rooms = Room.joins(:tags).where("tag_id = #{tag_id}")
                render json: { status: 'SUCCESS',data: {rooms: rooms } }
            end
            
            private
                def set_tag
                    @tag=Tag.find(params[:id])
                end

                def tag_id_param
                    params.require(:room_tag).permit(:tag_id)
                end
                
                def room_tag_params
                    params.require(:room_tag).permit(:tag_id, :room_id)
                end
            #karakawa
        end
    end
end

