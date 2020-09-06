'''
  Author: Hiranuma Tomoyuki
  Date: 202000907
'''

class User < ApplicationRecord
	has_secure_password
	has_many :relationships
	has_many :followings, through: :relationships, source: :follow
	has_many :reverse_of_relationships, class_name: 'UserFollow', foreign_key: 'follow_id'
	has_many :followers, through: :reverse_of_relationships, source: :user
	validates :name, :password, presence: true

	def follow(other_user)
		unless self == other_user
			self.relationships.find_or_create_by(follow_id: other_user.id)
		end
	end

	def unfollow(other_user)
		relationship = self.relationships.find_by(follow_id: other_user.id)
		if relationship
			relationship.destroy
		end
	end

	def following?(other_user)
		self.followings.include?(other)
	end
end
