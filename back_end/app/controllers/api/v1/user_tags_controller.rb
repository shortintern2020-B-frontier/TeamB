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
                tag_user_info = tag_user_params
                tag_user_info[:user_id] = @current_user.id
                tag_user = TagsUser.new(tag_user_info)
                if tag_user.save
                    render json: { status: 'SUCCESS', data: { tag_user: tag_user } }
                else
                    render json: { status: 'ERROR', data: { error: tag_user.errors } }
                end
            end
            
            #karakawa
            #userの持つtagを表示
            def show
              @tags = @user.tags
              render json: { status: 'SUCCESS', data: { tags: @tags} }
            end

            def set_user
              @user = User.find(params[:id])
            end
            #karakawa 
            #Kyosuke Yokota 
            def tag_user_params
                params.require(:tag_user).permit(:tag_id)
            end
            #KyosukeYokota
        end
    end
end
