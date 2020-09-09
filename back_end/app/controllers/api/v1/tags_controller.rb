'''
  author: Kyosuke Yokota
  Date: 20200904
'''

module Api
    module V1
        class TagsController < ApplicationController
            before_action :set_tag, only: [:destroy]
            def index 
                tags = Tag.order(created_at: :desc).select(:id,:name)
                render status:200, json: { status: 'SUCCESS', message: 'Loaded Tags', data: { tags: tags } }
              end
        
              def create
                tag = Tag.new(tag_params)
                if tag.save
                  render status:201, json: { status: 'SUCCESS', data: { tag: tag } }
                else
                  render status:500, json: { status: 'ERROR', data: { error: tag.errors } }
                end        
              end

              def search
                search = sanitize_sql_like(params[:search])
                tags = Tag.where('name LIKE ?', "%#{search}%")
                render status:200, json: { status: 'SUCCESS', data: { tags: tags } }
              end
              
              def destroy
                @tag.destroy
                render status:204, json: { status: 'SUCCESS', message: 'Deleted the Tag', data: { tag: @tag } }        
              end
        
              def tag_params
                params.require(:tag).permit(:name)
              end
        
              def set_tag
                @tag = Tag.find(params[:id])
              end

              def sanitize_sql_like(string, escape_character = "\\")
                pattern = Regexp.union(escape_character, "%", "_")
                string.gsub(pattern) { |x| [escape_character, x].join }
              end
        
        end
    end
end

