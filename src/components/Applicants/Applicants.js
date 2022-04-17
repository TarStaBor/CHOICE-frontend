import React, { useState } from "react";
import "./Applicants.css";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Applicant from "../Applicant/Applicant";

function Applicants(props) {
  const { applicantsData, setApplicantsData } = props;
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      {applicantsData
        .map((applicant) => {
          return <Applicant key={applicant._id} applicant={applicant} />;
        })
        .reverse()}
    </>
  );
}

export default Applicants;
