import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/Context";
import { useNavigate } from "react-router";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../HOC/ProtectedRoute";
import "./App.css";
import Main from "../Main/Main";
import Applications from "../Applications/Applications";
import Applicants from "../Applicants/Applicants";
import AddJob from "../AddJob/AddJob";
import Response from "../Response/Response";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Error from "../Error/Error";
import * as Api from "../../utils/Api";

function App() {
  const navigate = useNavigate();

  // Стейт  регистрации
  const [loggedIn, setLoggedIn] = useState(true);

  // Стейт актуального пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейт вакансий
  const [data, setData] = useState([]);

  // Стейт откликов
  const [applicantsData, setApplicantsData] = useState([]);

  // Стейт отфильтрованных откликов
  const [filterApplicantsData, setFilterApplicantsData] = useState([]);

  // Стейт блокировки инпута
  const [blockInput, setBlockInput] = useState(false);

  // Стейт сообщения с ошибкой при регистрации и авторизации
  const [errorMesage, setErrorMesage] = useState("");

  // Стейт прелодера
  const [isFilter, setIsFilter] = useState(false);

  // Стейт прелодера
  const [preloader, setPreloader] = useState(false);

  // Эффект проверки авторизации на сайте
  useEffect(() => {
    Api.getUserInfo(localStorage.token)
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
      });
  }, [loggedIn]);

  // Эффект получения информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      Api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // Получение всех вакансий
  useEffect(() => {
    if (loggedIn) {
      setPreloader(true);
      Api.getJobs()
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }, [loggedIn]);

  // Получение всех откликов
  useEffect(() => {
    if (loggedIn) {
      setPreloader(true);
      Api.getApplicants()
        .then((res) => {
          setApplicantsData(res);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }, [loggedIn]);

  // Функция запроса к АПИ на регистрацию
  function registration(name, email, password) {
    setPreloader(true);
    setBlockInput(true);
    Api.register(name, email, password)
      .then((res) => {
        if (email === res.email) {
          authorization(email, password);
          navigate("/applications", { replace: false });
        }
      })
      .catch((err) => {
        setErrorMesage(err.message);
      })
      .finally(() => {
        setPreloader(false);
        setBlockInput(false);
      });
  }

  // Функция запроса к АПИ на авторизацию
  function authorization(email, password) {
    setPreloader(true);
    setBlockInput(true);
    Api.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          navigate("/applications", { replace: false });
        }
      })
      .catch((err) => {
        setErrorMesage(err.message);
      })
      .finally(() => {
        setPreloader(false);
        setBlockInput(false);
      });
  }

  // Функция получения отфильтрованных откликов
  function getFilterApplicants(_id) {
    setPreloader(true);
    Api.getApplicantsByJobId(_id)
      .then((res) => {
        setFilterApplicantsData(res);
        setIsFilter(true);
        navigate("/applicants", { replace: false });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Функция очистки localStorage при выходе
  function handleloggedOutClick(evt) {
    evt.preventDefault();
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/", { replace: false });
  }

  // Функция удаления вакансиии
  function delJob(_id, company) {
    setPreloader(true);
    Api.delJob(_id, company)
      .then((res) => {
        console.log(res);
        setData(data.filter((card) => card._id !== _id));
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Функция удаления отклика
  function delApplicant(_id) {
    setPreloader(true);
    Api.delApplicant(_id)
      .then((res) => {
        console.log(res);
        setApplicantsData(applicantsData.filter((card) => card._id !== _id));
        setFilterApplicantsData(filterApplicantsData.filter((card) => card._id !== _id));
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Функция создания вакансии
  function handleCreateJob(formData) {
    setPreloader(true);
    Api.addJob(formData)
      .then((res) => {
        console.log(res);
        setData([...data, res]);
        navigate("/applications", { replace: false });
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Функция изменения комментария
  function handleCommentChange(text, _id) {
    setPreloader(true);
    Api.patchApplicantComment(text, _id)
      .then((res) => {
        setApplicantsData(
          applicantsData.map((item) => {
            if (item._id === _id) {
              return { ...item, comment: res };
            } else {
              return item;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="app">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/applications"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Applications
                  data={data}
                  setData={setData}
                  delJob={delJob}
                  getFilterApplicants={getFilterApplicants}
                  isPreloader={preloader}
                  handleCommentChange={handleCommentChange}
                  loggedIn={loggedIn}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicants"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Applicants
                  data={isFilter ? filterApplicantsData : applicantsData}
                  delApplicant={delApplicant}
                  setFilterApplicantsData={setFilterApplicantsData}
                  isPreloader={preloader}
                  setPreloader={setPreloader}
                  setIsFilter={setIsFilter}
                  handleCommentChange={handleCommentChange}
                  loggedIn={loggedIn}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-job"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <AddJob handleCreateJob={handleCreateJob} loggedIn={loggedIn} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  // setEdit={setEdit}
                  // handleUpdateUser={handleUpdateUser}
                  handleloggedOutClick={handleloggedOutClick}
                  // setSuccessEditProfile={setSuccessEditProfile}
                  // edit={edit}
                  errorMesage={errorMesage}
                  loggedIn={loggedIn}
                  isPreloader={preloader}
                  blockInput={blockInput}
                  // successEditProfile={successEditProfile}
                />
              </ProtectedRoute>
            }
          />

          {loggedIn ? (
            <Route path="/signup" element={<Navigate replace to="/applications" />} />
          ) : (
            <Route
              exact
              path="/signup"
              element={
                <Register
                  errorMesage={errorMesage}
                  handleSubmit={registration}
                  // isPreloader={preloader}
                  blockInput={blockInput}
                />
              }
            />
          )}

          {loggedIn ? (
            <Route path="/signin" element={<Navigate replace to="/applications" />} />
          ) : (
            <Route
              exact
              path="/signin"
              element={
                <Login
                  errorMesage={errorMesage}
                  handleSubmit={authorization}
                  // isPreloader={preloader}
                  blockInput={blockInput}
                />
              }
            />
          )}

          <Route path="/response/:_id" element={<Response isPreloader={preloader} setPreloader={setPreloader} />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
