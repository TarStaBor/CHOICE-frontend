import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Response.css";
import check from "../../images/check-mark.svg";
import levelStyle from "../../utils/LevelStyle";
import { Validation } from "../../utils/Validation";
import * as Api from "../../utils/Api";

function Response() {
  const [data, setData] = useState();
  const { _id } = useParams();
  const { values, handleChange, errors, isValid } = Validation();
  const fileInputRef = useRef();
  const [resume, setResume] = useState();
  const [link, setLink] = useState("");

  const [fileIsValid, setFileIsValid] = useState(false);

  useEffect(() => {
    Api.getJobById(_id)
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }, [_id]);

  // Валидация загруженного логотипа
  function handleResumeChange(e) {
    const file = e.target.files[0];
    console.log(file);
    if (
      (file && file.type === "application/msword") ||
      (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
      (file && file.type === "application/pdf") ||
      (file && file.type === "application/vnd.ms-powerpoint") ||
      (file && file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") ||
      (file && file.type === "image/jpeg") ||
      (file && file.type === "image/png") ||
      (file && file.type === "application/zip") ||
      (file && file.type === "application/x-7z-compressed")
    ) {
      setResume(file);
      setFileIsValid(true);
    } else {
      console.log("не проходит по формату");
      setFileIsValid(false);
    }
    e.target.value = null;
  }
  // Валидация введенного адреса и запись адреса в стейт переменную
  // для корректной работы валидации при пустом инпуте
  function handleLinkChange(e) {
    handleChange(e);
    setLink(e.target.value);
  }

  // Отправка данных формы
  function Submit(evt) {
    evt.preventDefault();
    let formData = new FormData();
    let date = new Date().toLocaleString();
    formData.append("resume", resume);
    formData.append("link", link);
    formData.append("date", date);
    formData.append("company", data.company);
    formData.append("jobId", _id);

    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }

    Api.addResponse(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }

  return (
    <>
      {data && (
        <div className="response">
          <form className="response__sections" onSubmit={Submit}>
            <div className="response__company">
              <div className="response__position">{data.position}</div>
              <img className="response__logo" src={`http://${data.logo}`} alt="Логотип компании"></img>
              <div className="response__name">{data.company}</div>
            </div>
            <div className="response__tags">
              <div className={`response__level ${levelStyle(data.level)}`}>{data.level.toUpperCase()}</div>
              {data.tag.map((t, i) => {
                return (
                  <div key={i} className="response__tag">
                    {t.toUpperCase()}
                  </div>
                );
              })}
            </div>
            <div className="response__resume">
              <div className="response__resume-title">Добавьте файл с резюме</div>
              {!fileIsValid ? (
                <label className="response__resume-button-label link-opacity">
                  <input
                    type="file"
                    accept=".doc, .docx, .pdf, .ppt, .pptx, .jpeg, .jpg, .png, .zip, .7z"
                    ref={fileInputRef}
                    className="response__resume-button"
                    name="logo"
                    onChange={handleResumeChange}
                  ></input>
                  Загрузить
                </label>
              ) : (
                <img className="response__check" src={check} alt="Файл загружен"></img>
              )}
            </div>
            <div className="response__link">
              <div className="response__link-title">Или оставьте на него ссылку</div>
              <input
                type="url"
                className="response__link-input"
                name="link"
                id="link"
                onChange={handleLinkChange}
                minLength="2"
                maxLength="100"
                autoComplete="off"
              ></input>
            </div>
            <div className="response__policy">
              <input
                type="checkbox"
                className="response__policy-input"
                name="policy"
                id="policy"
                onChange={handleChange}
                required
              />
              <label className="response__policy-label" htmlFor="policy">
                <span>Согласен с </span>
                <a href="#" className="response__policy_type_link">
                  политикой обработки персональных данных
                </a>
              </label>
            </div>
            <div className="response__submit">
              <button
                type="submit"
                className={` ${
                  (isValid && link.length !== 0) || (isValid && values.policy && resume)
                    ? "response__submit-button link-opacity"
                    : "response__submit-button response__submit-button_type_disabled"
                }`}
                disabled={(isValid && link.length !== 0) || (isValid && !!values.policy && !!resume) ? "" : "disabled"}
              >
                Откликнуться
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Response;
