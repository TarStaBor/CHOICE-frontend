import React, { useState } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Application from "../Application/Application";
import "./Applications.css";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Applications(props) {
  const { data, delJob, getFilterApplicants, isPreloader, loggedIn } = props;

  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <>
      {isPreloader && <Preloader />}
      <Header loggedIn={loggedIn} />
      <Search searchValue={searchInputValue} setSearchValue={setSearchInputValue} />
      <div className="applications">
        {data
          .map((job) => {
            return <Application key={job._id} job={job} delJob={delJob} getFilterApplicants={getFilterApplicants} />;
          })
          .reverse()}
      </div>

      <Footer />
    </>
  );
}
export default Applications;
