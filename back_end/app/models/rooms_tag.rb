class RoomsTag < ApplicationRecord
    validates :room_id, presence: true
    validates :tag_id, presence: true
end
