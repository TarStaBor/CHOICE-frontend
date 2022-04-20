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
  console.log(applicantsData.length);
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
  }, [navigate]);

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
  }, [navigate]);

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

  function delApplicant(_id) {
    Api.delApplicant(_id)
      .then((res) => {
        console.log(res);
        setApplicantsData(applicantsData.filter((card) => card._id !== _id));
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
        navigate("/applications", { replace: false });
        window.scrollTo(0, 0);
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
          element={
            <Applicants
              applicantsData={applicantsData}
              setApplicantsData={setApplicantsData}
              delApplicant={delApplicant}
            />
          }
        />
        <Route path="/add-job" element={<AddJob handleCreateJob={handleCreateJob} />} />
        <Route path="/response/:_id" element={<Response />} />
      </Routes>
    </section>
  );
}

export default App;
