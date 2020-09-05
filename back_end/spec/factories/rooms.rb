#rikuiwasaki
FactoryBot.define do
  factory :rooms_show,class: Room do
    name {|n|"room#{n}"}
    youtube_id{|n|"#{n}"}
    admin_id{|n|"#{n}"}
    is_private{false}
    start_time{Time.current}
  end
end
#rikuiwasaki