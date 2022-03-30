// import logo from "../../logo.svg";
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Applications from "../Applications/Applications";
import AddJob from "../AddJob/AddJob";
// import Movies from "../Movies/Movies";
// import Error from "../Error/Error";

function App() {
  return (
    <section className="root">
      <Routes>
        <Route path="/applications" element={<Applications />} />
        <Route path="/applicants" element={<Applications />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </section>
  );
}

export default App;
