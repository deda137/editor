import React from 'react'
import Login from "./components/Login/Login";
import MyEditor from "./components/MyEditor/MyEditor";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MyEditor />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
