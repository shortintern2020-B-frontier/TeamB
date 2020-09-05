'''
  author: Kyosuke Yokota
  Date: 20200904
'''


module Api
    module V1
        class UsersController < ApplicationController
            def index 
                users = User.order(created_at: :desc)
                render json: { status: 'SUCCESS', message: 'Loaded posts', data: users }
            end
            # ユーザ登録
            def create
                user = User.new(user_params)
                if user.save
                  render json: { status: 'SUCCESS', data: user }
                else
                  render json: { status: 'ERROR', data: user.errors }
                end
            end

            def user_params
                params.require(:user).permit(:name,:password)
              end
        end
    end
end

