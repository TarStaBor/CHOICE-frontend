import React, { useState } from "react";
import "./Applicants.css";
import Header from "../Header/Header";
import Search from "../Search/Search";
import repair from "../../images/repair.png";

function Applicants() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header />

      <section className="applicants"></section>
    </>
  );
}

export default Applicants;
