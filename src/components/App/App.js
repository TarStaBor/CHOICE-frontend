import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import Main from "../Main/Main";
import Applications from "../Applications/Applications";
import Applicants from "../Applicants/Applicants";
import AddJob from "../AddJob/AddJob";
import Applicant from "../Applicant/Applicant";
import * as Api from "../../utils/Api";

function App() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //Получение всех вакансий
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

  function delJob(_id, company) {
    Api.delJob(_id, company)
      .then((res) => {
        console.log(res);
        setData(data.filter((card) => card._id !== _id));
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }
  function handleCreateJob(formData) {
    Api.addJob(formData)
      .then((res) => {
        console.log(res);
        setData([...data, res]);
        // console.log(data);
        navigate("/applications", { replace: false });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }

  return (
    <section className="root">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/applications" element={<Applications data={data} setData={setData} delJob={delJob} />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/add-job" element={<AddJob handleCreateJob={handleCreateJob} />} />
        <Route path="/applicant/:_id" element={<Applicant />} />
      </Routes>
    </section>
  );
}

export default App;
