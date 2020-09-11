class TagsUser < ApplicationRecord
    validates :user_id, presence: true
    validates :tag_id, presence: true, uniqueness: {scope: :user_id}  #karakawa
end
