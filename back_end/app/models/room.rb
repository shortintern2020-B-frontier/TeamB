class Room < ApplicationRecord
    has_many :chats #rikuiwasaki
    #Kyosuke Yokota
    has_and_belongs_to_many :tags

    validates :admin_id, presence: true
    validates :youtube_id, presence: true
    validates :name, presence: true, uniqueness: true
    #Kyosuke Yokota
end
