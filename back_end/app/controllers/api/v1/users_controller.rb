'''
  author: Kyosuke Yokota
  Date: 20200904
'''


module Api
    module V1
        class UsersController < ApplicationController
            # ルームに入室しているユーザ一覧を取得(入室した順番に取得)
            def index 
                users = User.where(room_id: params[:room_id]).order(updated_at: :desc)
                render json: { status: 'SUCCESS', message: 'Loaded posts', data: { users: users } }
            end
            # ユーザ登録
            def create
                user = User.new(user_params)
                if user.save
                  render json: { status: 'SUCCESS', data: { user: user } }
                else
                  render json: { status: 'ERROR', data: { error:user.errors } }
                end
            end

            def user_params
                params.require(:user).permit(:name, :password, :room_id)
              end
        end
    end
end

