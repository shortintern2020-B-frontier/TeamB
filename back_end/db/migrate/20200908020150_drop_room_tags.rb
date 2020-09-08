'''
  author: Kyosuke Yokota
  Date: 20200907
'''

class DropRoomTags < ActiveRecord::Migration[5.1]
  def change
    drop_table :room_tags
  end
end
