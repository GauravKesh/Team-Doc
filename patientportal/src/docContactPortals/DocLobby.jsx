import React, { useCallback, useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

export default function DocLobby() {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientID, setPatientID] = useState("");
  const [patientIDCheck, setPatientIDCheck] = useState(false);
  const Navigate = useNavigate();

  const socket = useSocket();
  console.log(socket);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("connectToDoctor:Connect", {
        patientEmail,
        patientName,
        patientID,
      });
      console.log({ patientName, patientEmail, patientID });
      setPatientName("");
      setPatientEmail("");
      setPatientID("");
    },
    [patientName, patientEmail, patientID, socket]
  );

  const pid = () => {
    const isUnique = (id, existingIds) => {
      return !existingIds.includes(id);
    };

    let patId = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const capsAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";

    const existingIds = []; // Array to store existing patient IDs

    do {
      patId = "";
      for (let i = 0; i < 3; i++) {
        patId += capsAlphabets.charAt(
          Math.floor(Math.random() * capsAlphabets.length)
        );
      }
      for (let i = 0; i < 5; i++) {
        patId += smallAlphabets.charAt(
          Math.floor(Math.random() * smallAlphabets.length)
        );
      }
      for (let i = 0; i < 10; i++) {
        patId += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
    } while (!isUnique(patId, existingIds));

    existingIds.push(patId);

    setPatientID(patId);

    !patientIDCheck
      ? setPatientID(patId)
      : patientIDCheck
      ? setPatientIDCheck(false)
      : setPatientIDCheck(true);
  };
  const [remoteSocketId, setRemoteSocketId] = useState(null); // State to store the remote socket ID

  const handleJoinRoom = useCallback((data) => {
    const { Email, Name, PID } = data; // Destructure the data object
    console.log(data);
    // Redirect to the Doctor with the given ID
    Navigate(`/Doctor/${PID}`);
    

  }, [Navigate]);
  useEffect(() => {
    socket.on("connectToDoctor:Connect", handleJoinRoom);
    return () => {
      socket.off("connectToDoctor:Connect", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="container">
      <h2>Connect to Doctor</h2>
      <div
        className="formSub "
        style={{
          width: "400px",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="patientName">Name</label>
          <input
            type="text"
            name="patientName"
            id="patientName"
            value={patientName}
            onChange={(e) => {
              setPatientName(e.target.value);
            }}
          />
          <label htmlFor="patientEmail">Email</label>
          <input
            type="email"
            name="patientEmail"
            id="patientEmail"
            value={patientEmail}
            onChange={(e) => {
              setPatientEmail(e.target.value);
            }}
          />
          <label htmlFor="patientID">PatinetId</label>
          <input
            type="text"
            name="patientID"
            id="patientID"
            value={patientID}
            readOnly
            onFocus={() => {
              pid();
            }}
            onChange={(e) => {
              pid();
              setPatientID(e.target.value);
            }}
          />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
