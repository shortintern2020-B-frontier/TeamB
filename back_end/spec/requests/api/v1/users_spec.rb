#rikuiwasaki

require 'rails_helper'
describe 'UserCreateAPI' do
  it '全てのUserを取得' do
    FactoryBot.create_list(:users_show,1)
    get '/api/v1/users#index'
    users=JSON.parse(response.body)
    expect(response.status).to eq("SUCCESS")
    expect(users['data'].length).to eq(1)
  end
end
