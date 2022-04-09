import React, { useState } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Application from "../Application/Application";
import "./Applications.css";

function Applications() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Application />
      <Application />
    </>
  );
}

export default Applications;
