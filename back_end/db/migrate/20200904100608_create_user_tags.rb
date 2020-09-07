class CreateUserTags < ActiveRecord::Migration[5.1]
  def change
    create_table :user_tags, id: false do |t|
      t.belongs_to :user
      t.belongs_to :tag
  end
    # create_table :user_tags do |t|
    #   t.integer :user_id
    #   t.integer :tag_id

    #   t.timestamps
    # end
  end
end
