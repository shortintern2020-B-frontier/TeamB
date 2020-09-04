class CreateRoomTags < ActiveRecord::Migration[5.1]
  def change
    create_table :room_tags do |t|
      t.integer :room_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
