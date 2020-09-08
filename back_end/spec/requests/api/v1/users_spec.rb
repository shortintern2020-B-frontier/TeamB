#rikuiwasaki

require 'rails_helper'
describe 'UserAPI' do
  it '全てのUserを取得' do
    FactoryBot.create_list(:user_create,10)
    get '/api/v1/users#index'
    users=JSON.parse(response.body)
    
    expect(response.status).to eq(200)
    expect(users['data']['users'].length).to eq(10)
  end
  it '新しいUserを作成' do
    valid_params={
                  user:{
                    name:'user_1',
                    password:'password',
                    room_id:'1'
                  }
                }
    expect{post '/api/v1/users',params:valid_params}.to change(User,:count).by(+1)
    expect(response.status).to eq(200)
  end
  it '他のユーザ情報閲覧' do
    created_user=FactoryBot.build(:user_create)
    get "/api/v1/users/#{created_user.id}"
    user=JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(user['data']['user'].name).to eq(created_user.name)
  end

  
end
#rikuiwasaki