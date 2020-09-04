class CreateUserFollows < ActiveRecord::Migration[5.1]
  def change
    create_table :user_follows do |t|
      t.integer :user_id
      t.integer :follow_id

      t.timestamps
    end
  end
end
