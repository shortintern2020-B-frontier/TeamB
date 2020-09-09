class AddRoomsTagsId < ActiveRecord::Migration[5.1]
  def change
    drop_table :rooms_tags
    create_table :rooms_tags do |t|
      t.belongs_to :room
      t.belongs_to :tag

      t.timestamps
    end
  end
end
