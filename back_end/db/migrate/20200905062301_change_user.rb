'''
  Author: Hiranuma Tomoyuki
'''

class ChangeUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :password, :string
  end
end
