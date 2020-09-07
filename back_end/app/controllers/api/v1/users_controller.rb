'''
  author: Kyosuke Yokota
  Date: 20200904
'''


module Api
    module V1
        class UsersController < ApplicationController
          jwt_authenticate except: [:create, :show]
          before_action :set_user, only: [:show, :update]
          
            # ルームに入室しているユーザ一覧を取得(入室した順番に取得)
            def index 
                users = User.where(room_id: params[:room_id]).order(updated_at: :desc)
                render json: { status: 'SUCCESS', message: 'Loaded posts', data: { users: users } }
            end

            def show
                user = User.find(params[:id])
                render json: { status: 'SUCCESS', message: 'Loaded posts', data: { user: @user } }
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

            def update
                if @user.update(user_params)
                    render json: { status: 'SUCCESS', message: 'Updated the post', data: { user: @user } }
                  else
                    render json: { status: 'SUCCESS', message: 'Not updated', data: { user: @user.errors } }
                end
            end

            def user_params
                params.require(:user).permit(:name, :profile, :room_id, :password)
            end

            def set_user
                @user = User.find(params[:id])
            end
        end
    end
end

