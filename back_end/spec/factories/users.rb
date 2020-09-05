#rikuiwasaki
FactoryBot.define do
  factory :user_create,class: User do
    name {|n|"hoge#{n}"}
    password {|n|"fuga#{n}"}
  end
  
end
#rikuiwasaki