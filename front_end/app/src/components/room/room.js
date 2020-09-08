import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import WS from 'ws';
const Room = ()=>{
  /*
  const [rooms,setRooms] = useState([])
  handleRecieveRoom=response =>{
    console.log(response)
    setRooms([...rooms, response.room]
    );
  };
  useEffect(() => {
    fetch(`ws://localhost:5000/cable`)
    .then(res => res.json())
    .then(roomsArr => setRooms(roomsArr
    ));
    console.log(rooms)

  });*/
  return(
    <div className="Room">
      <ActionCableConsumer
        channel={{ channel: 'RoomsChannel'}}
        onReceived={handleRecieveRoom} 
      />
    </div>
  );
}
export default Room;