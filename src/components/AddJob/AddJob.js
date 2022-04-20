import React, { useState, useEffect, useRef } from "react";
import "./AddJob.css";
import { Validation } from "../../utils/Validation";
import Header from "../Header/Header";
import AddTags from "../AddTags/AddTags";
import Footer from "../Footer/Footer";
import shirt from "../../images/logo-black-and-white.png";

function AddJob(props) {
  const { handleCreateJob } = props;
  // Валидация
  const { values, handleChange, errors, isValid } = Validation();
  // Стейт уровня соискателя
  const [level, setLevel] = useState("intern");
  // Стейт файла логотипа компании
  const [logo, setLogo] = useState();
  // Стейт предварительного просмотра логотипа компании
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  // Стейт массива тэгов.
  const [tags, setTags] = useState([]);
  console.log(values.tags);

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

  // Функция удаления логотипа
  function handleRemoveLogo() {
    setPreview(shirt);
    setLogo("");
  }

  // Функция изменения уровня соискателя
  function handleChangeLevel(e) {
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
    handleCreateJob(formData);
  }

  return (
    <>
      <Header />
      <section className="addJob">
        <form className="addJob__form" onSubmit={Submit}>
          <div className="addJob__company">
            <p className="addJob__input-name">Название компании</p>
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
            <span className="addJob__error-message">{errors.company}</span>
          </div>
          <div className="addJob__position">
            <p className="addJob__input-name">Специализация</p>
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
            <span className="addJob__error-message">{errors.position}</span>
          </div>
          <div className="addJob__level">
            <p className="addJob__input-name">Уровень</p>
            <div className="addJob__container">
              <input
                className="addJob__hidden"
                id="intern"
                type="radio"
                name="level"
                onChange={handleChangeLevel}
                defaultChecked
              />
              <label className="addJob__button-label" htmlFor="intern">
                <p>INTERN</p>
              </label>
              <input className="addJob__hidden" id="junior" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="junior">
                <p>JUNIOR</p>
              </label>
              <input className="addJob__hidden" id="middle" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="middle">
                <p>MIDDLE</p>
              </label>
              <input className="addJob__hidden" id="senior" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="senior">
                <p>SENIOR</p>
              </label>
              <input className="addJob__hidden" id="lead" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="lead">
                <p>LEAD</p>
              </label>
              <input className="addJob__hidden" id="director" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="director">
                <p>DIRECTOR</p>
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
              Логотип
            </label>
            <img
              className={!logo ? "addJob__logo-preview" : "addJob__logo-preview addJob__logo-preview_type_delete"}
              src={preview}
              alt="Логотип"
              onClick={handleRemoveLogo}
            />
          </div>

          <div className="addJob__note">
            <p className="addJob__input-name">Комментарий</p>
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
            <span className="addJob__error-message">{errors.note}</span>
          </div>

          <div className="addJob__todo">
            <p className="addJob__input-name">Что делать:</p>
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
            <span className="addJob__error-message addJob__error-message_type_textarea">{errors.todo}</span>
          </div>
          <div className="addJob__why">
            <p className="addJob__input-name">Почему стоит откликнуться:</p>
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
            <span className="addJob__error-message addJob__error-message_type_textarea">{errors.why}</span>
          </div>
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
      <Footer />
    </>
  );
}

export default AddJob;
