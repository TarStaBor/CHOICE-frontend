import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Application from "../Application/Application";
import * as Api from "../../utils/Api";
import "./Applications.css";

function Applications(props) {
  const { data, delJob } = props;
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      {data.map((job) => {
        return <Application key={job._id} job={job} delJob={delJob} />;
      })}
    </>
  );
}

export default Applications;
