#rikuiwasaki

require 'rails_helper'
describe 'UserCreateAPI' do
  it '全てのUserを取得' do
    FactoryBot.create_list(:users_show,10)
    get '/api/v1/users#index'
    users=JSON.parse(response.body)
    
    expect(response.status).to eq(200)
    expect(users['data']['users'].length).to eq(10)
  end
end
