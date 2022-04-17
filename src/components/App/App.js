import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import Main from "../Main/Main";
import Applications from "../Applications/Applications";
import Applicants from "../Applicants/Applicants";
import AddJob from "../AddJob/AddJob";
import Response from "../Response/Response";
import * as Api from "../../utils/Api";

function App() {
  const [data, setData] = useState([]);
  const [applicantsData, setApplicantsData] = useState([]);
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

  //Получение всех откликов
  useEffect(() => {
    Api.getApplicants()
      .then((res) => {
        setApplicantsData(res);
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
        <Route
          path="/applicants"
          element={<Applicants applicantsData={applicantsData} setApplicantsData={setApplicantsData} />}
        />
        <Route path="/add-job" element={<AddJob handleCreateJob={handleCreateJob} />} />
        <Route path="/response/:_id" element={<Response />} />
      </Routes>
    </section>
  );
}

export default App;
