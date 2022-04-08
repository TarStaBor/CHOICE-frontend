import React, { useState } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import "./Applications.css";
import repair from "../../images/repair.png";

function Applications() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <section className="applications">
        <h1>Раздел "Все вакансии" в разработке</h1>
        <img className="applications__repair" src={repair} alt="repair"></img>
      </section>
    </>
  );
}

export default Applications;
