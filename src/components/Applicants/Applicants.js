import React, { useState } from "react";
import "./Applicants.css";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Applicant from "../Applicant/Applicant";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Applicants(props) {
  const { data, delApplicant, isPreloader, setPreloader } = props;
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      {isPreloader && <Preloader />}
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="applicants">
        {data
          .map((applicant) => {
            return (
              <Applicant
                key={applicant._id}
                applicant={applicant}
                delApplicant={delApplicant}
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

export default Applicants;
