import React, { useState } from "react";
import "./Applicants.css";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Applicant from "../Applicant/Applicant";

function Applicants() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Applicant />
    </>
  );
}

export default Applicants;
