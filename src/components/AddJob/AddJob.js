import React, { useState, useEffect } from "react";
import "./AddJob.css";
import { Validation } from "../../utils/Validation";
import Header from "../Header/Header";
import AddTags from "../AddTags/AddTags";
import Footer from "../Footer/Footer";
import shirt from "../../images/logo-black-and-white.png";

function AddJob(props) {
  const { handleCreateJob, loggedIn } = props;

  const { values, handleChange, errors, isValid } = Validation();

  const [level, setLevel] = useState("intern");
  const [logoFile, setLogoFile] = useState();
  const [previewLogo, setPreviewLogo] = useState();
  const [tags, setTags] = useState([]);

  // Displaying the logo when uploading a file
  useEffect(() => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result);
      };
      reader.readAsDataURL(logoFile);
    } else {
      setPreviewLogo(shirt);
    }
  }, [logoFile]);

  // Validation of the uploaded logo
  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setLogoFile(file);
    } else {
      setPreviewLogo(shirt);
      setLogoFile("");
    }
    e.target.value = null;
  }

  function handleRemoveLogo() {
    setPreviewLogo(shirt);
    setLogoFile("");
  }

  function handleChangeLevel(e) {
    setLevel(e.target.id);
  }

  function Submit(evt) {
    evt.preventDefault();
    let formData = new FormData();
    formData.append("company", values.company);
    formData.append("position", values.position);
    formData.append("level", level);
    for (let i = 0; i < tags.length; i++) {
      formData.append("tags", tags[i]);
    }
    formData.append("logo", logoFile);
    formData.append("note", values.note);
    formData.append("todo", values.todo);
    formData.append("why", values.why);

    for (let [name, value] of formData) {
      console.log(`${name} = ${value}`);
    }

    handleCreateJob(formData);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="addJob">
        <form className="addJob__form" onSubmit={Submit}>
          <fieldset className="addJob__company">
            <label className="addJob__input-name" htmlFor="company">
              Название компании
            </label>
            <input
              className={`addJob__input ${errors.company && "addJob__input_error"}`}
              type="text"
              name="company"
              id="company"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
            />
            <span className="addJob__error-message addJob__error-message_type_text">{errors.company}</span>
          </fieldset>

          <fieldset className="addJob__position">
            <label className="addJob__input-name" htmlFor="position">
              Специализация
            </label>
            <input
              className={`addJob__input ${errors.position && "addJob__input_error"}`}
              type="text"
              name="position"
              id="position"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
            />
            <span className="addJob__error-message addJob__error-message_type_text">{errors.position}</span>
          </fieldset>

          <fieldset className="addJob__level">
            <label className="addJob__input-name">Уровень</label>
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
                <p className="addJob__button-label-text">INTERN</p>
              </label>
              <input className="addJob__hidden" id="junior" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="junior">
                <p className="addJob__button-label-text">JUNIOR</p>
              </label>
              <input className="addJob__hidden" id="middle" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="middle">
                <p className="addJob__button-label-text">MIDDLE</p>
              </label>
              <input className="addJob__hidden" id="senior" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="senior">
                <p className="addJob__button-label-text">SENIOR</p>
              </label>
              <input className="addJob__hidden" id="lead" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="lead">
                <p className="addJob__button-label-text">LEAD</p>
              </label>
              <input className="addJob__hidden" id="director" type="radio" name="level" onChange={handleChangeLevel} />
              <label className="addJob__button-label" htmlFor="director">
                <p className="addJob__button-label-text">DIRECTOR</p>
              </label>
            </div>
          </fieldset>

          <fieldset className="addJob__tag">
            <AddTags tags={tags} setTags={setTags} />
          </fieldset>

          <fieldset className="addJob__logo">
            <label className="addJob__logo-button-label link-opacity">
              <input
                type="file"
                accept="image/*"
                className="addJob__logo-button"
                name="logo"
                onChange={handleLogoChange}
              ></input>
              Логотип
            </label>
            <img
              className={!logoFile ? "addJob__logo-preview" : "addJob__logo-preview addJob__logo-preview_delete"}
              src={previewLogo}
              alt="Логотип"
              onClick={handleRemoveLogo}
            />
          </fieldset>

          <fieldset className="addJob__note">
            <label className="addJob__input-name" htmlFor="note">
              Комментарий
            </label>
            <input
              className={`addJob__input ${errors.note && "addJob__input_error"}`}
              type="text"
              name="note"
              id="note"
              onChange={handleChange}
              minLength="2"
              maxLength="60"
              required
              autoComplete="off"
            />
            <span className="addJob__error-message addJob__error-message_type_text">{errors.note}</span>
          </fieldset>

          <fieldset className="addJob__todo">
            <label className="addJob__input-name" htmlFor="todo">
              Что делать:
            </label>
            <textarea
              wrap="virtual"
              className={`addJob__textarea ${errors.todo && "addJob__input_error"}`}
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
          </fieldset>

          <fieldset className="addJob__why">
            <label className="addJob__input-name" htmlFor="why">
              Почему стоит откликнуться:
            </label>
            <textarea
              className={`addJob__textarea ${errors.why && "addJob__input_error"}`}
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
          </fieldset>

          <fieldset className="addJob__submit">
            <button
              type="submit"
              className={` ${
                !isValid || !logoFile || !tags.length
                  ? "addJob__submit-button addJob__submit-button_disabled"
                  : "addJob__submit-button link-opacity"
              }`}
              disabled={(!isValid || !logoFile || !tags.length) && "disabled"}
            >
              Добавить
            </button>
          </fieldset>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default AddJob;
