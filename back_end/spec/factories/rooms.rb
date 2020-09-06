#rikuiwasaki
FactoryBot.define do
  factory :room_create,class: Room do
    name {|n|"room#{n}"}
    youtube_id{|n|"#{n}"}
    admin_id{|n|"#{n}"}
    is_private{false}
    start_time{Time.current}
  end
end
#rikuiwasaki