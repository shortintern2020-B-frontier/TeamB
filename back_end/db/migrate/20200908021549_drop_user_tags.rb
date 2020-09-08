'''
  author: Kyosuke Yokota
  Date: 20200907
'''

class DropUserTags < ActiveRecord::Migration[5.1]
  def change
    drop_table :user_tags
  end
end
