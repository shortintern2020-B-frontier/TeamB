'''
  Author: Hiranuma Tomoyuki
'''


class CreateChats < ActiveRecord::Migration[5.1]
  def change
    create_table :chats do |t|
      t.integer :user_id
      t.integer :room_id
      t.string :text

      t.timestamps
    end
  end
end
