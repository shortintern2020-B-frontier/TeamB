'''
  Author: Kyosuke Yokota
  Date: 20200904
'''

class Tag < ApplicationRecord
    has_and_belongs_to_many :users
    has_and_belongs_to_many :rooms
    validates :name, presence: true, unique: true 
end
