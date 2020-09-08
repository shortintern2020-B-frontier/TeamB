'''
  author: Kyosuke Yokota
  Date: 20200907
'''

class CreateTagsUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :tags_users do |t|
      t.belongs_to :user
      t.belongs_to :tag

      t.timestamps
    end
  end
end
