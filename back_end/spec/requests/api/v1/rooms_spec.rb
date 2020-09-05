#rikuiwasaki

require 'rails_helper'
describe 'RoomAPI' do
  it '全てのRoomを取得' do
    FactoryBot.create_list(:room_create,10)
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
  it 'ルームを編集' do
    FactoryBot.create(:room_create)
    time=Time.current
    edit_params={name:'edited_room',
                youtube_id:'2',
                is_private:false,
                start_time:time
    }
    edited_room=JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(edited_room['data'].room.youtube_id).to eq(2)
    expect(edited_room['data'].room.name).to eq('edited_room')
    expect(edited_room['data'].room.start_time).to eq(time)
  end
  it '不正なユーザがルームを編集' do
  end
  it 'ルーム内でチャット' do
  end
  it 'ユーザのタグに関するルームを表示' do
  end
  it 'ルームを終了' do
  end  
  it 'ルームをタグで検索' do
  end  
  it 'ルームに入室' do
  end
  it 'ルームを退室' do
  end
  it 'ルーム内のユーザーの生存確認' do
  end
  it '同じルーム内のユーザ情報を表示' do
  end
  it 'ルームに動画を追加' do
  end
  

end
#rikuiwasaki