'''
  author: Kyosuke Yokota
  Date: 20200907
'''

module Api
    module V1
        class UserRoomTagsController < ApplicationController
            include JwtAuthenticator
            jwt_authenticate
            before_action :set_tag, only: [:show]
            def show
                @room = Room.where(id: @room_ids)
                render json: { status: 'SUCCESS', data: { data: @room } }
            end

            def set_tag 
                @tag = @current_user.tags
                tag_array = []
                @tag.each do |t|
                    tag_array.push(t.id)                    
                end

                @room_tag = RoomsTag.where(tag_id: tag_array)
                @room_ids = []
                @room_tag.each do |t|
                    @room_ids.push(t.room_id)
                end

            end
        end
    end
end

