class RemoveYoutubeIdFromRooms < ActiveRecord::Migration[5.1]
  def change
    remove_column :rooms, :youtube_id, :integer
  end
end
