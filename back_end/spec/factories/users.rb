#rikuiwasaki
FactoryBot.define do
  factory :users_show,class: User do
    name {|n|"hoge#{n}"}
    password {|n|"fuga#{n}"}
  end
end
#rikuiwasaki