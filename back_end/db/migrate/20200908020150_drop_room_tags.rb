class DropRoomTags < ActiveRecord::Migration[5.1]
  def change
    drop_table :room_tags
  end
end
