class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream from "chat_channel"
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def chat(data)

    RoomChannel.broadcast_to('message',data['message'])
  end

end
