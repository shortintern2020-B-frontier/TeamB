module Api
    module V1
        class ChatsController < ApplicationController            #rikuiwasaki
            #jwt_authenticate except: :index

            def index
                chats = Chat.where(room_id: params[:room_id]).order(updated_at: :desc)
                render json: { status: 'SUCCESS',data: {
                    chats: chats } }
            end
            def create
                chat_info=chat_params
                chat_info[:user_id] = 1#@current_user.id
                @new_chat=Chat.new(chat_info)
                if @new_chat.save
                    render json: { status: 'SUCCESS', data: { chat: @new_chat } }
                else 
                    render json: { status: 'ERROR', data: { error: errors }}
                end
            end
            def update
                chat = Chat.find(params[:id])
                if chat.user_id == @current_user.id
                    if updated_chat=Chat.update(chat_params)
                        render json: { status: 'SUCCESS', data: {chat: updated_chat}}
                    else
                        render json: { status: 'ERROR', data: { errors: updated_chat.errors}}
                    end
                else
                    render json: {status: 'ERROR', data:{erros: "invalid user"}}
                end
            
            end
            private
                def set_chat
                    @chat=Chat.find(params[:id])
                end
                def chat_params
                    params.require(:chat).permit(:text,:room_id)
                end
        #rikuiwasaki
        end
    end
end
