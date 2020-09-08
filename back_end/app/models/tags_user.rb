class TagsUser < ApplicationRecord
    validates :user_id, presence: true
    validates :tag_id, presence: true
end
