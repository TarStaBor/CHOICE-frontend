import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import "./Applicants.css";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Applicant from "../Applicant/Applicant";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Applicants(props) {
  const {
    data,
    delApplicant,
    setFilterApplicantsData,
    isPreloader,
    setPreloader,
    setIsFilter,
    handleCommentChange,
    loggedIn,
  } = props;

  const [searchInputValue, setSearchInputValue] = useState("");

  // const navigate = useNavigate();

  // TODO: Check for no responses
  // useEffect(() => {
  //   if (data.length === 0) {
  //     navigate("/applications", { replace: false });
  //     setIsFilter(false);
  //     // localStorage.removeItem("filterApplicants");
  //   }
  // }, [data]);

  useEffect(() => {
    return () => {
      setFilterApplicantsData([]);
      setIsFilter(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isPreloader && <Preloader />}
      <Header loggedIn={loggedIn} />
      <Search searchValue={searchInputValue} setSearchValue={setSearchInputValue} />
      {data && (
        <div className="applicants">
          {data
            .map((applicant) => {
              return (
                <Applicant
                  key={applicant._id}
                  applicant={applicant}
                  delApplicant={delApplicant}
                  setPreloader={setPreloader}
                  handleCommentChange={handleCommentChange}
                />
              );
            })
            .reverse()}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Applicants;
