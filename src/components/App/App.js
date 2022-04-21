import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Applications from "../Applications/Applications";
import Applicants from "../Applicants/Applicants";
import AddJob from "../AddJob/AddJob";
import Response from "../Response/Response";
import Error from "../Error/Error";
import * as Api from "../../utils/Api";

function App() {
  // Стейт вакансий
  const [data, setData] = useState([]);
  // Стейт откликов
  const [applicantsData, setApplicantsData] = useState([]);
  const navigate = useNavigate();

  // Получение всех вакансий
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

  // Получение всех откликов
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

  // Функция удаления вакансиии
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

  // Функция удаления отклика
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

  // Функция создания вакансии
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
    <section className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/applications" element={<Applications data={data} setData={setData} delJob={delJob} />} />
        <Route
          path="/applicants"
          element={<Applicants applicantsData={applicantsData} delApplicant={delApplicant} />}
        />
        <Route path="/add-job" element={<AddJob handleCreateJob={handleCreateJob} />} />
        <Route path="/response/:_id" element={<Response />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </section>
  );
}

export default App;
