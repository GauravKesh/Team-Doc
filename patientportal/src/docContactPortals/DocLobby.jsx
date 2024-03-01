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
    <>
      <div className="form-container   flex justify-center">
        <form class="max-w-sm mx-auto " onSubmit={handleSubmit}>
          <div class="mb-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              id="patientName"
              value={patientName}
              onChange={(e) => {
                setPatientName(e.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="mb-5">
            <label
              htmlFor="patientEmail"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Patient Email
            </label>
            <input
              type="email"
              name="patientEmail"
              id="patientEmail"
              value={patientEmail}
              onChange={(e) => {
                setPatientEmail(e.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div class="mb-5">
            <label
              htmlFor="patientEmail"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Patient Id
            </label>
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
              class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      {/*   <form
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
      </form> */}
    </>
  );
}
