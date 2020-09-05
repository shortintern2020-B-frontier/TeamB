#rikuiwasaki

require 'rails_helper'
describe 'RoomAPI' do
  it '全てのRoomを取得' do
    FactoryBot.create_list(:rooms_show,10)
    get '/api/v1/rooms'
    rooms=JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(users['data']['rooms'].length).to eq(10)
  end
  it '新しいROOMを作成' do
    valid_params={name:'room1',
                  youtube_id:'1',
                  admin_id:'1',
                  is_private:false,
                  start_time:Time.current
                }
    expect{post '/api/v1/rooms',params:{post:valid_params}}.to change(Room,:count).by(+1)
    expect(response.status).to eq(200)

  end


end
#rikuiwasaki