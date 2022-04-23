import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Application from "../Application/Application";
import "./Applications.css";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Applications(props) {
  const { data, delJob, getFilterApplicants, setFilterApplicantsData, isPreloader, setPreloader } = props;
  // Стейт содержимого инпута
  const [searchValue, setSearchValue] = useState("");

  // Эффект очистки филтрованных откликов при уходе со страницы
  useEffect(() => {
    return setFilterApplicantsData();
  }, []);

  return (
    <>
      {isPreloader && <Preloader />}
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="applications">
        {data
          .map((job) => {
            return (
              <Application
                key={job._id}
                job={job}
                delJob={delJob}
                getFilterApplicants={getFilterApplicants}
                setPreloader={setPreloader}
              />
            );
          })
          .reverse()}
      </div>

      <Footer />
    </>
  );
}
export default Applications;
