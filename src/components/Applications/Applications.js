import React, { useState } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Application from "../Application/Application";
import "./Applications.css";
import Footer from "../Footer/Footer";

function Applications(props) {
  const { data, delJob } = props;
  const [searchValue, setSearchValue] = useState("");
  // console.log(data);
  return (
    <>
      <Header />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="applications">
        {data
          .map((job) => {
            return <Application key={job._id} job={job} delJob={delJob} />;
          })
          .reverse()}
      </div>
      <Footer />
    </>
  );
}

export default Applications;
