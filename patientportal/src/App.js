/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import DocLobby from "./docContactPortals/DocLobby";
import Doctor from "./docContactPortals/Doctor";
import NearestHospital from "./components/NearestHospital";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import About from "./components/About";
import HealthCheckup from "./components/HealthCheckup.jsx";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <nav
        className=""
        style={{
          backgroundColor: "grey",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul
          className="ull"
          style={{
            display: "flex",
            flexDirection: "row",
            listStyle: "none",
            margin: "10px",
            padding: "10px",
            listStyleType: "",
          }}
        >
          <li style={{ margin: "10px", listStyle: "none" }}>
            <Link to="/">Home</Link>
          </li>
          <li style={{ margin: "10px", listStyle: "none" }}>
            <Link to="/Health">Health Checkup</Link>
          </li>
          <li style={{ margin: "10px", listStyle: "none" }}>
            <Link to="/Hospital">Nearest Hospital</Link>
          </li>
          <li style={{ margin: "10px", listStyle: "none" }}>
            <Link to="/doctor">Doctors</Link>
          </li>
          <li style={{ margin: "10px", listStyle: "none" }}>
            <Link to="/doctor/:doctorId">Call Doctor</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/doctor" element={<DocLobby />} />
        <Route path="/" element={<About />} />
        <Route path="/Health" element={<HealthCheckup />} />
        <Route path="/Hospital" element={<NearestHospital />} />
        <Route path="/doctor/:doctorId" element={<Doctor />} />
      </Routes>
    </>
  );
}

export default App;
