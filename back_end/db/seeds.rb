# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#rikuiwasaki

20.times do |n|
  User.create(:name=>"name#{n}",:password=>"password#{n}")
end

5.times do |n|
  Room.create(:name=>"room#{n}",:youtube_id=>"TvRVcN-fJLE",
  :admin_id=>"#{n+1}"
  )
end

Tag.create(:name=>"ゲーム")
Tag.create(:name=>"アニメ")
Tag.create(:name=>"HIKAKIN")
Tag.create(:name=>"魚")
Tag.create(:name=>"鬼滅の刃")
Tag.create(:name=>"楽天")
Tag.create(:name=>"ポケモン")
Tag.create(:name=>"Vtuber")


10.times do |n|
  Relationship.create(:user_id=>n+1,:follow_id=>5)
  5.times do |k|
    Relationship.create(:user_id=>n+1,:follow_id=>n+k)
  end
end

10.times do |n|
  3.times do |k|
    TagsUser.create(:user_id=>n+1,:tag_id=>k+1)
  end
end

5.times do |n|
  2.times do |k|
    RoomsTag.create(:room_id=>n+1,:tag_id=>k+1)
  end
end



#rikuiwasaki