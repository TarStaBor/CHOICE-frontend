import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // Эффект проверки что после удаления откликов нет
  useEffect(() => {
    console.log(data);
    if (data.length === 0) {
      navigate("/applications", { replace: false });
      setIsFilter(false);
      // localStorage.removeItem("filterApplicants");
    }
  }, [data]);

  // Эффект очистки фильтрованных откликов при уходе со страницы
  useEffect(() => {
    return () => {
      setFilterApplicantsData([]);
      setIsFilter(false);
      // localStorage.removeItem("filterApplicants");
    };
  }, []);

  return (
    <>
      {isPreloader && <Preloader />}
      <Header loggedIn={loggedIn} />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
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
