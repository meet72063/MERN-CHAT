import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import ChatPage from "./Pages/ChatPage";
import Protectected from "./Components/Protectected";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/chat"
            element={
              <Protectected>
                <ChatPage />
              </Protectected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
