class User < ApplicationRecord
    has_secure_password
    validates :name, :password, presence: true
end
