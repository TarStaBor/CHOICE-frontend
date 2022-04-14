import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Applications from "../Applications/Applications";
import Applicants from "../Applicants/Applicants";
import AddJob from "../AddJob/AddJob";
import Applicant from "../Applicant/Applicant";
import * as Api from "../../utils/Api";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Api.getJobs()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }, []);

  function delJob(_id) {
    console.log("сейчас будет удаление");
    Api.delJob(_id)
      .then((res) => {
        console.log(res);
        setData(data.filter((card) => card._id !== _id));
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }
  console.log(data);

  return (
    <section className="root">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/applications" element={<Applications data={data} setData={setData} delJob={delJob} />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/add-job" element={<AddJob />} />
        {/* <Route path="/applicant/:_id" element={<OtherComponent />} /> */}
        <Route path="/applicant/:_id" element={<Applicant data={data} />} />
      </Routes>
    </section>
  );
}

export default App;
