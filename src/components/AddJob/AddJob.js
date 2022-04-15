import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import shirt from "../../images/logo-black-and-white.png";
import "./AddJob.css";
import { Validation } from "../../utils/Validation";
import AddTags from "../AddTags/AddTags";

function AddJob(props) {
  const { handleCreateJob } = props;
  const { values, handleChange, errors, isValid } = Validation();
  const [level, setLevel] = useState("intern");
  const [logo, setLogo] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const [tags, setTags] = useState([]);

  // Отображение логотипа при загрузке файла
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

  function handleRemoveLogo(e) {
    setPreview(shirt);
    setLogo("");
  }

  // Валидация загруженного логотипа
  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setLogo(file);
    } else {
      console.log("не картинка");
      setPreview(shirt);
      setLogo("");
    }
    e.target.value = null;
  }

  function handle(e) {
    setLevel(e.target.id);
  }

  // Отправка данных формы
  function Submit(evt) {
    evt.preventDefault();
    let formData = new FormData();
    formData.append("company", values.company);
    formData.append("position", values.position);
    formData.append("level", level);
    for (let i = 0; i < tags.length; i++) {
      formData.append("tag", tags[i]);
    }
    formData.append("logo", logo);
    formData.append("note", values.note);
    formData.append("todo", values.todo);
    formData.append("why", values.why);

    // for (let key of formData.keys()) {
    //   console.log(key, formData.get(key));
    // }
    handleCreateJob(formData);
  }

  return (
    <>
      <Header />
      <section className="addJob">
        <form className="addJob__form" onSubmit={Submit}>
          <div className="addJob__company">
            <h2 className="addJob__input-name">Название компании</h2>
            <input
              className={`addJob__input ${errors.company && "addJob__input_type_error"}`}
              type="text"
              name="company"
              id="company"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
            />
          </div>
          <div className="addJob__position">
            <h2 className="addJob__input-name">Специализация</h2>
            <input
              className={`addJob__input ${errors.position && "addJob__input_type_error"}`}
              type="text"
              name="position"
              id="position"
              onChange={handleChange}
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
                onChange={handle}
                defaultChecked
              />
              <label className="addJob__button-label" htmlFor="intern">
                <h1>INTERN</h1>
              </label>
              <input className="addJob__hidden" id="junior" type="radio" name="accept-offers" onChange={handle} />
              <label className="addJob__button-label" htmlFor="junior">
                <h1>JUNIOR</h1>
              </label>
              <input className="addJob__hidden" id="middle" type="radio" name="accept-offers" onChange={handle} />
              <label className="addJob__button-label" htmlFor="middle">
                <h1>MIDDLE</h1>
              </label>
              <input className="addJob__hidden" id="senior" type="radio" name="accept-offers" onChange={handle} />
              <label className="addJob__button-label" htmlFor="senior">
                <h1>SENIOR</h1>
              </label>
              <input className="addJob__hidden" id="lead" type="radio" name="accept-offers" onChange={handle} />
              <label className="addJob__button-label" htmlFor="lead">
                <h1>LEAD</h1>
              </label>
              <input
                className="addJob__hidden"
                id="director"
                type="radio"
                name="accept-offers"
                onChange={handleChange}
              />
              <label className="addJob__button-label" htmlFor="director">
                <h1>DIRECTOR</h1>
              </label>
            </div>
          </div>

          <div className="addJob__tag">
            <AddTags tags={tags} setTags={setTags} />
          </div>
          <div className="addJob__logo">
            <label className="addJob__logo-button-label link-opacity">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="addJob__logo-button"
                name="logo"
                onChange={handleLogoChange}
              ></input>
              <div className="addJob__logo-button-text">Логотип</div>
            </label>
            <img
              className={!logo ? "addJob__logo-preview" : "addJob__logo-preview addJob__logo-preview_type_delete"}
              src={preview}
              alt="Логотип"
              onClick={handleRemoveLogo}
            />
          </div>

          <div className="addJob__note">
            <h2 className="addJob__input-name">Комментарий</h2>
            <input
              className={`addJob__input ${errors.note && "addJob__input_type_error"}`}
              type="text"
              name="note"
              id="note"
              onChange={handleChange}
              minLength="2"
              maxLength="60"
              required
              autoComplete="off"
            />
          </div>

          <div className="addJob__todo">
            <h2 className="addJob__input-name">Что делать:</h2>
            <textarea
              wrap="virtual"
              className={`addJob__textarea ${errors.todo && "addJob__input_type_error"}`}
              type="text"
              name="todo"
              id="todo"
              onChange={handleChange}
              minLength="2"
              maxLength="500"
              required
              autoComplete="off"
            />
          </div>
          <div className="addJob__why">
            <h2 className="addJob__input-name">Почему стоит откликнуться:</h2>
            <textarea
              className={`addJob__textarea ${errors.why && "addJob__input_type_error"}`}
              type="text"
              name="why"
              id="why"
              onChange={handleChange}
              minLength="2"
              maxLength="500"
              required
              autoComplete="off"
            />
          </div>
          {/* ---------------- */}
          <div className="addJob__submit">
            <button
              type="submit"
              className={` ${
                !isValid || !logo || !tags.length
                  ? "addJob__submit-button addJob__submit-button_type_disabled"
                  : "addJob__submit-button link-opacity"
              }`}
              disabled={(!isValid || !logo || !tags.length) && "disabled"}
            >
              Добавить
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddJob;
