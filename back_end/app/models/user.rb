class User < ApplicationRecord
    validates :name, :password, presence: true
end
