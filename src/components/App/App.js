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
  const [applicantsData, setApplicantsData] = useState();
  // Стейт отфильтрованных откликов
  const [filterApplicantsData, setFilterApplicantsData] = useState();

  // Стейт прелодера
  const [preloader, setPreloader] = React.useState(true);

  const navigate = useNavigate();

  // Получение всех вакансий
  useEffect(() => {
    setPreloader(true);
    Api.getJobs()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }, []);

  // Получение всех откликов
  useEffect(() => {
    setPreloader(true);
    Api.getApplicants()
      .then((res) => {
        setApplicantsData(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }, []);

  // Функция получения отфильтрованных откликов
  function getFilterApplicants(_id) {
    setPreloader(true);
    Api.getApplicantsCount(_id)
      .then((res) => {
        console.log(res);
        setFilterApplicantsData(res);
        navigate("/applicants", { replace: false });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Функция удаления вакансиии
  function delJob(_id, company) {
    setPreloader(true);
    Api.delJob(_id, company)
      .then((res) => {
        console.log(res);
        setData(data.filter((card) => card._id !== _id));
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Функция удаления отклика
  function delApplicant(_id) {
    setPreloader(true);
    Api.delApplicant(_id)
      .then((res) => {
        console.log(res);
        setApplicantsData(applicantsData.filter((card) => card._id !== _id));
        setFilterApplicantsData(filterApplicantsData.filter((card) => card._id !== _id));
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Функция создания вакансии
  function handleCreateJob(formData) {
    setPreloader(true);
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
      .finally(() => {
        setPreloader(false);
      });
  }

  return (
    <section className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/applications"
          element={
            <Applications
              data={data}
              setData={setData}
              delJob={delJob}
              getFilterApplicants={getFilterApplicants}
              setFilterApplicantsData={setFilterApplicantsData}
              isPreloader={preloader}
              setPreloader={setPreloader}
            />
          }
        />
        <Route
          path="/applicants"
          element={
            <Applicants
              data={filterApplicantsData ? filterApplicantsData : applicantsData}
              delApplicant={delApplicant}
              isPreloader={preloader}
              setPreloader={setPreloader}
            />
          }
        />
        <Route path="/add-job" element={<AddJob handleCreateJob={handleCreateJob} />} />
        <Route path="/response/:_id" element={<Response isPreloader={preloader} setPreloader={setPreloader} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </section>
  );
}

export default App;
