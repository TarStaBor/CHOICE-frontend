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
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <section className="applicants">
        <h1>Раздел "Отклики" в разработке</h1>
        <img className="applicants__repair" src={repair} alt="repair"></img>
      </section>
    </>
  );
}

export default Applicants;
