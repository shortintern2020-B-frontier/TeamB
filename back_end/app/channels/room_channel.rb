class RoomChannel < ApplicationCable::Channel
  def subscribed

     stream_for "room_#{params[:room_id]}"

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def chat(data)

    RoomChannel.broadcast_to('message','hello')
  end

end
