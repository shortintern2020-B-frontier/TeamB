'''
  author: Kyosuke Yokota
  Date: 20200907
'''

module Api
    module V1
        class UserTagsController < ApplicationController
            include JwtAuthenticator
            jwt_authenticate
            
            def create
                user_tag_info = user_tag_params
                user_tag_info[:user_id] = @current_user.id
                user_tag = UserTag.new(user_tag_info)
                if user_tag.save
                  render json: { status: 'SUCCESS', data: { user: user_tag } }
                else
                  render json: { status: 'ERROR', data: { error: user_tag.errors } }
                end
            end

            def user_tag_params
                params.require(:user_tag).permit(:tag_id)
            end
        end
    end
end
