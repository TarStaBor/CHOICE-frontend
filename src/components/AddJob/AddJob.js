import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import shirt from "../../images/logo-black-and-white.png";
import * as Api from "../../utils/Api";
import "./AddJob.css";

function AddJob() {
  const [data, setData] = useState({
    company: "",
    position: "",
    level: "",
    tag: "",
    note: "",
    todo: "",
    why: "",
  });

  function handle(e) {
    const newdata = { ...data };

    if (e.target.name === "accept-offers") {
      newdata.level = e.target.id;
      console.log("1");
    } else {
      newdata[e.target.id] = e.target.value;
      console.log("2");
    }
    setData(newdata);
    console.log(newdata);
  }

  const [logo, setLogo] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    if (logo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(logo);
    } else {
      setPreview(shirt);
    }
  }, [logo]);

  function Submit(evt) {
    evt.preventDefault();
    let formData = new FormData();
    formData.append("company", data.company);
    formData.append("position", data.position);
    formData.append("level", data.level);
    formData.append("tag", data.tag);
    formData.append("logo", logo);
    formData.append("note", data.note);
    formData.append("todo", data.todo);
    formData.append("why", data.why);

    Api.addJob(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setLogo(file);
    } else {
      console.log("не картинка");
    }
  }

  return (
    <>
      <Header />
      <section className="addJob">
        <form className="addJob__form" onSubmit={Submit}>
          <div className="addJob__company">
            <h2 className="addJob__input-name">Название компании</h2>
            <input
              className="addJob__input"
              type="text"
              name="company"
              id="company"
              onChange={(e) => handle(e)}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
            />
          </div>
          <div className="addJob__position">
            <h2 className="addJob__input-name">Специализация</h2>
            <input
              className="addJob__input"
              type="text"
              name="position"
              id="position"
              onChange={(e) => handle(e)}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
            />
          </div>
          <div className="addJob__level">
            <h2 className="addJob__input-name">Уровень</h2>
            <div className="addJob__container">
              <input
                className="addJob__hidden"
                id="intern"
                type="radio"
                name="accept-offers"
                onChange={(e) => handle(e)}
              />
              <label className="addJob__button-label" htmlFor="intern">
                <h1>INTERN</h1>
              </label>
              <input
                className="addJob__hidden"
                id="junior"
                type="radio"
                name="accept-offers"
                onChange={(e) => handle(e)}
              />
              <label className="addJob__button-label" htmlFor="junior">
                <h1>JUNIOR</h1>
              </label>
              <input
                className="addJob__hidden"
                id="middle"
                type="radio"
                name="accept-offers"
                onChange={(e) => handle(e)}
              />
              <label className="addJob__button-label" htmlFor="middle">
                <h1>MIDDLE</h1>
              </label>
              <input
                className="addJob__hidden"
                id="senior"
                type="radio"
                name="accept-offers"
                onChange={(e) => handle(e)}
              />
              <label className="addJob__button-label" htmlFor="senior">
                <h1>SENIOR</h1>
              </label>
              <input
                className="addJob__hidden"
                id="lead"
                type="radio"
                name="accept-offers"
                onChange={(e) => handle(e)}
              />
              <label className="addJob__button-label" htmlFor="lead">
                <h1>LEAD</h1>
              </label>
              <input
                className="addJob__hidden"
                id="director"
                type="radio"
                name="accept-offers"
                onChange={(e) => handle(e)}
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
              id="tag"
              onChange={(e) => handle(e)}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
            />
          </div>
          <div className="addJob__logo">
            <label className="addJob__logo-button-label">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="addJob__logo-button"
                name="logo"
                required
                onChange={handleLogoChange}
              ></input>
              <div className="addJob__logo-button-text">Логотип</div>
            </label>
            <img className="addJob__logo-preview" src={preview} alt="Логотип" />
          </div>

          <div className="addJob__note">
            <h2 className="addJob__input-name">Комментарий</h2>
            <input
              className="addJob__input"
              type="text"
              name="note"
              id="note"
              onChange={(e) => handle(e)}
              minLength="2"
              maxLength="60"
              required
              autoComplete="off"
            />
          </div>

          <div className="addJob__todo">
            <h2 className="addJob__input-name">Что делать:</h2>
            <textarea
              className="addJob__textarea"
              type="text"
              name="todo"
              id="todo"
              onChange={(e) => handle(e)}
              minLength="2"
              maxLength="120"
              required
              autoComplete="off"
            />
          </div>
          <div className="addJob__why">
            <h2 className="addJob__input-name">Почему стоит откликнуться:</h2>
            <textarea
              className="addJob__textarea"
              type="text"
              name="why"
              id="why"
              onChange={(e) => handle(e)}
              minLength="2"
              maxLength="120"
              required
              autoComplete="off"
            />
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
