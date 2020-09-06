module Api
    module V1
        class ChatsController < ApplicationController
            #rikuiwasaki
            #認証を後で追加
            def index
                chats = Chat.where(room_id: params[:room_id]).order(updated_at: :desc)
                render json: { status: 'SUCCESS',data: {
                    chats: chats } }
            end
            def create
                chat=Chat.new(chat_params)
                if chat.save
                    render json: { status: 'SUCCESS', data: { chat: chat } }
                else 
                    render json: { status: 'ERROR', data: { error: errors }}
                end
            end
            def update
                
            end
            private
                def set_chat
                    @chat=Chat.find(params[:id])
                end
                def chat_params
                    params.require(:chat).permit(:text,:user_id,:room_id)
                end
        #rikuiwasaki
        end
    end
end
