import React, { useState, useCallback } from "react";
import axios from "axios";
// import { useForm } from "react-hook-form";
import Header from "../Header/Header";
// import shirt from "../../images/logo-black-and-white.png";
import logo from "../../images/logo-black-and-white.png";

import "./AddJob.css";

function AddJob() {
  const [company, setCompany] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [level, setLevel] = useState("");
  const [tag, setTag] = useState("");
  // const [logo, setLogo] = useState(shirt);
  const [comment, setComment] = useState("");
  const [todo, setTodo] = useState("");
  const [why, setWhy] = useState("");

  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(logo);

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append("avatar", img);
      await axios
        .post("http://localhost:3000/upload-avatar", data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          setAvatar(res.data.data.path);
        });
    } catch (error) {
      console.error(error);
    }
  }, [img]);

  // ----------resolve-reject------------

  // const getData = (url) => {
  //   new Promise((resolve, reject) => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => resolve(json))
  //       .catch((error) => reject(error));
  //   });
  // };

  // function sendFile() {
  //   getData("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error.message));
  // }

  // ----------async-await------------

  // const getData = async (url) => {
  //   const res = await fetch(url);
  //   const json = await res.json();
  //   return json;
  // };

  // function sendFile() {
  //   const url = "https://jsonplaceholder.typicode.com/todos/1"
  //   try {
  //   const data = await getData(url)
  //   console.log(data);
  //   }
  //   catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // ----------------------
  function handleCompanyChange(e) {
    setCompany(e.target.value);
    console.log(company);
  }

  function handleSpecializationChange(e) {
    setSpecialization(e.target.value);
    console.log(specialization);
  }

  function handleLevelChange(e) {
    setLevel(e.target.id);
    console.log(e.target.id);
  }

  function handleTagChange(e) {
    setTag(e.target.value);
    console.log(tag);
  }

  function handleCommentChange(e) {
    setComment(e.target.value);
    console.log(comment);
  }

  function handleTodoChange(e) {
    setTodo(e.target.value);
    console.log(todo);
  }

  function handleWhyChange(e) {
    setWhy(e.target.value);
    console.log(why);
  }

  function Submite(evt) {
    evt.preventDefault();
    console.log("Компания: " + company);
    console.log("Специализация: " + specialization);
    console.log("Уровень: " + level);
    console.log("Тэг: " + tag);
    console.log("Логотип: " + avatar);
    console.log("Комментарий: " + comment);
    console.log("Что делать: " + todo);
    console.log("Почему стоит: " + why);

    // handleSubmit(values.email, values.password);
  }
  return (
    <>
      <Header />
      <section className="addJob">
        <form className="addJob__form" onSubmit={Submite}>
          <div className="addJob__company">
            <h2 className="addJob__input-name">Название компании</h2>
            <input
              className="addJob__input"
              type="text"
              name="company"
              onChange={handleCompanyChange}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          <div className="addJob__specialization">
            <h2 className="addJob__input-name">Специализация</h2>
            <input
              className="addJob__input"
              type="text"
              name="specialization"
              onChange={handleSpecializationChange}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          <div className="addJob__level">
            <h2 className="addJob__input-name">Уровень</h2>
            <div className="addJob__container">
              <input
                className="addJob__hidden"
                id="intern"
                type="radio"
                name="accept-offers"
                onChange={handleLevelChange}
              />
              <label className="addJob__button-label" htmlFor="intern">
                <h1>INTERN</h1>
              </label>
              <input
                className="addJob__hidden"
                id="junior"
                type="radio"
                name="accept-offers"
                onChange={handleLevelChange}
              />
              <label className="addJob__button-label" htmlFor="junior">
                <h1>JUNIOR</h1>
              </label>
              <input
                className="addJob__hidden"
                id="middle"
                type="radio"
                name="accept-offers"
                onChange={handleLevelChange}
              />
              <label className="addJob__button-label" htmlFor="middle">
                <h1>MIDDLE</h1>
              </label>
              <input
                className="addJob__hidden"
                id="senior"
                type="radio"
                name="accept-offers"
                onChange={handleLevelChange}
              />
              <label className="addJob__button-label" htmlFor="senior">
                <h1>SENIOR</h1>
              </label>
              <input
                className="addJob__hidden"
                id="lead"
                type="radio"
                name="accept-offers"
                onChange={handleLevelChange}
              />
              <label className="addJob__button-label" htmlFor="lead">
                <h1>LEAD</h1>
              </label>
              <input
                className="addJob__hidden"
                id="director"
                type="radio"
                name="accept-offers"
                onChange={handleLevelChange}
              />
              <label className="addJob__button-label" htmlFor="director">
                <h1>DIRECTOR</h1>
              </label>
            </div>
          </div>
          <div className="addJob__tag">
            <h2 className="addJob__input-name">Тэг</h2>
            <input
              className="addJob__input"
              type="text"
              name="tag"
              onChange={handleTagChange}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          <div className="addJob__logo">
            {/* <button className="addJob__logo-button">Логотип</button> */}
            <label className="addJob__logo-button-label">
              <input
                type="file"
                className="addJob__logo-button"
                // name="logo"
                // accept="image/*"
                required
                onChange={(e) => {
                  setImg(e.target.files[0]);
                  sendFile();
                }}
              ></input>
              <div className="addJob__logo-button-text">Логотип</div>
            </label>
            {/* <img className="addJob__logo-preview" src={logo} alt="Логотип"></img> */}
            {avatar ? (
              <img className="addJob__logo-preview" src={avatar} alt="Логотип" />
            ) : (
              <img className="addJob__logo-preview" src={img} alt="Логотип" />
            )}
            <button type="button" className="addJob__logo-button-label" onClick={sendFile}>
              Просмотр
            </button>
          </div>
          {/* ----------------- */}
          <div className="addJob__comment">
            <h2 className="addJob__input-name">Комментарий</h2>
            <input
              className="addJob__input"
              type="text"
              name="comment"
              onChange={handleCommentChange}
              minLength="2"
              maxLength="60"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          {/* ----------------- */}
          <div className="addJob__todo">
            <h2 className="addJob__input-name">Что делать:</h2>
            <textarea
              className="addJob__textarea"
              type="text"
              name="todo"
              onChange={handleTodoChange}
              minLength="2"
              maxLength="120"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          <div className="addJob__why">
            <h2 className="addJob__input-name">Почему стоит откликнуться:</h2>
            <textarea
              className="addJob__textarea"
              type="text"
              name="why"
              onChange={handleWhyChange}
              minLength="2"
              maxLength="120"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          {/* ---------------- */}
          <div className="addJob__submit">
            <button type="submit" className="addJob__submit-button">
              Добавить
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddJob;
