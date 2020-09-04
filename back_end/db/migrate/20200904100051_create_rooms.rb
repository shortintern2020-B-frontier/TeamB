class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.string :name
      t.integer :youtube_id
      t.integer :admin_id
      t.boolean :is_private
      t.string :password
      t.timestamp :start_time

      t.timestamps
    end
  end
end
