class DropUserTags < ActiveRecord::Migration[5.1]
  def change
    drop_table :user_tags
  end
end
