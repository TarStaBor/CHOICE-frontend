import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Application from "../Application/Application";
import "./Applications.css";
import * as Api from "../../utils/Api";

function Applications() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    Api.getJobs()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      {data.map((job) => {
        return <Application key={job._id} job={job} />;
      })}
    </>
  );
}

export default Applications;
