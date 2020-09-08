'''
  author: Kyosuke Yokota
  Date: 20200907
'''

class CreateRoomsTags < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms_tags, id: false do |t|
      t.belongs_to :room
      t.belongs_to :tag

      t.timestamps
    end
  end
end
