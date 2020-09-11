'''
  Author: Hiranuma Tomoyuki
'''

class AddYoutubeIdToRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :youtube_id, :string
  end
end
