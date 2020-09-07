'''
  author: Kyosuke Yokota
  Date: 20200904
'''

module Api
    module V1
        class TagsController < ApplicationController
            before_action :set_tag, only: [:destroy]
            def index 
                tags = Tag.order(created_at: :desc)
                render json: { status: 'SUCCESS', message: 'Loaded Tags', data: { tags: tags } }
              end
        
              def create
                tag = Tag.new(tag_params)
                if tag.save
                  render json: { status: 'SUCCESS', data: { tag: tag } }
                else
                  render json: { status: 'ERROR', data: { error: tag.errors } }
                end        
              end
        
              def destroy
                @tag.destroy
                render json: { status: 'SUCCESS', message: 'Deleted the  Tag', data: { tag: @tag } }        
              end
        
              def tag_params
                params.require(:tag).permit(:name)
              end
        
              def set_tag
                @tag = Tag.find(params[:id])
              end
        end
    end
end

