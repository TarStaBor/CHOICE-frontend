import React, { useState } from "react";
import "./Applicants.css";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Applicant from "../Applicant/Applicant";
import Footer from "../Footer/Footer";

function Applicants(props) {
  const { applicantsData, delApplicant } = props;
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="applicants">
        {applicantsData
          .map((applicant) => {
            return <Applicant key={applicant._id} applicant={applicant} delApplicant={delApplicant} />;
          })
          .reverse()}
      </div>
      <Footer />
    </>
  );
}

export default Applicants;
