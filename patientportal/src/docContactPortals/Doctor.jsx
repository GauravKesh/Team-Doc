import React, { useCallback,useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../context/SocketProvider'

export default function Doctor() {
  const Navigate = useNavigate();
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState("");
  const handlUeserJoined = useCallback(({ patientEmail,patientName,patientId ,id}) => {
    console.log(`User Joined ${patientEmail} ${patientName} ${patientId} ${id}`);
    setRemoteSocketId(id);
   
   
  },[])
  
  useEffect(() => {
    socket.on("user:Joined",handlUeserJoined)

    return () => {
      socket.off("user:Joined",handlUeserJoined)
    }
  },[socket,handlUeserJoined]);

    
  return (
    <div>
       <h1>Doctor</h1>
       <h4>
       {remoteSocketId ? "connected ":"No one in room"} </h4>
       

       
    </div>
  )
}
