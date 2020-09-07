class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream from "room_channel"
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def chat
  end
end
