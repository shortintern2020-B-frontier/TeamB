'''
  Author: Kyosuke Yokota
  Date: 20200904
'''

class Tag < ApplicationRecord
    # modelの関係性については確認したいので一旦コメント
    # has_many :user_tag, :room_tag
    validates :name, presence: true
end
