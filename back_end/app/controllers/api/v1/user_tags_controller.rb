'''
  author: Kyosuke Yokota
  Date: 20200907
'''

module Api
    module V1
        class UserTagsController < ApplicationController
            include JwtAuthenticator
            jwt_authenticate

            before_action :set_user , only: [:show]

            def create
                user_tag_info = user_tag_params
                user_tag_info[:user_id] = @current_user.id
                user_tag = UserTag.new(user_tag_info)
                if user_tag.save
                  render json: { status: 'SUCCESS', data: { user_tag: user_tag } }
                else
                  render json: { status: 'ERROR', data: { error: user_tag.errors } }
                end
            end

            #karakawa
            #userの持つtagを表示
            def show
              @tags = @user.tags
              render json: { status: 'SUCCESS', data: { tags: @tags} }
            end

            def set_user
              @user = User.find(parms[:id])
            end
            #karakawa  

            def user_tag_params
                params.require(:user_tag).permit(:tag_id)
            end
        end
    end
end
