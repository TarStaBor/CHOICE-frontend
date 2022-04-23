import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Response.css";
import check from "../../images/check-mark.svg";
import information from "../../images/information.svg";
import levelStyle from "../../utils/LevelStyle";
import { Validation } from "../../utils/Validation";
import fileFormatValidation from "../../utils/FileFormatValidation";
import SuccessfulSending from "../SuccessfulSending/SuccessfulSending";
import Modal from "../Modal/Modal";
import { FORMATS } from "../../utils/Constants";
import * as Api from "../../utils/Api";
import Preloader from "../Preloader/Preloader";

function Response(props) {
  const { isPreloader, setPreloader } = props;
  const { values, handleChange, errors, isValid } = Validation();
  // Стейт данных отклика
  const [data, setData] = useState();
  // Стейт файла резюме
  const [resume, setResume] = useState("");
  // Стейт ссылки на резюме
  const [link, setLink] = useState("");
  // Стейт валидности файла
  const [fileIsValid, setFileIsValid] = useState(false);
  // Стейт статуса отображения модального окна с форматами файлов
  const [isModal, setIsModal] = useState(false);
  // Стейт статуса успешной отправки отклика
  const [isSuccessfulSending, setIsSuccessfulSending] = useState(false);
  // Стейт сообщения невалидного типа файла
  const [filTypeError, setFilTypeError] = useState("");

  const fileInputRef = useRef();
  const { _id } = useParams();

  // Эффект получения данных о вакансии
  useEffect(() => {
    setPreloader(true);
    Api.getJobById(_id)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }, [_id]);

  // Валидация загруженного резюме
  function handleResumeChange(e) {
    const file = e.target.files[0];
    const extention = file.name.split(".").pop();
    if (fileFormatValidation(file.type, extention)) {
      setResume(file);
      setFileIsValid(true);
    } else {
      setFilTypeError(`Файл формата ${extention} не подходит!`);
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

  // Функция отображения модального окна с допустимыми форматами файла
  function handleModalOpen() {
    setIsModal(!isModal);
  }

  // Отправка данных формы
  function Submit(evt) {
    evt.preventDefault();
    setPreloader(true);
    let formData = new FormData();
    let date = new Date().toLocaleString();
    formData.append("resume", resume);
    formData.append("link", link);
    formData.append("date", date);
    formData.append("company", data.company);
    formData.append("jobId", _id);

    // for (let key of formData.keys()) {
    //   console.log(key, formData.get(key));
    // }

    Api.addResponse(formData)

      .then((res) => {
        setIsSuccessfulSending(true);
        console.log(res);
      })
      .catch((err) => {
        setIsSuccessfulSending(false);
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  return (
    <>
      {isPreloader && <Preloader />}
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
              {data.tags.map((tag, i) => {
                return (
                  <div key={i} className="response__tag">
                    {tag.toUpperCase()}
                  </div>
                );
              })}
            </div>
            <div className="response__resume">
              <div className="response__resume-title">
                Добавьте файл с резюме
                <img
                  src={information}
                  onMouseOver={handleModalOpen}
                  onMouseOut={handleModalOpen}
                  className="response__modal"
                  alt=""
                />
                <Modal isModal={isModal} setIsModal={setIsModal} />
              </div>
              {!fileIsValid ? (
                <>
                  <label className="response__resume-button-label  link-opacity">
                    <input
                      type="file"
                      accept={FORMATS}
                      ref={fileInputRef}
                      className="response__resume-button"
                      name="logo"
                      onChange={handleResumeChange}
                    ></input>
                    Загрузить
                  </label>
                  <span className="response__fileValidError-message">{filTypeError}</span>
                </>
              ) : (
                <img className="response__check" src={check} alt="Файл загружен"></img>
              )}
            </div>
            <div className="response__link">
              <div className="response__link-title">Или оставьте на него ссылку</div>
              <input
                type="url"
                className={`response__link-input ${errors.link && "response__link-input_type_error"}`}
                name="link"
                id="link"
                onChange={handleLinkChange}
                minLength="2"
                maxLength="100"
                autoComplete="off"
              ></input>
              <span className="response__error-message">{errors.link}</span>
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

              <label className="response__policy-label" htmlFor="policy"></label>

              <div className="response__policy-text">
                <span className="response__policy-text_type_text">Согласен с </span>

                <a href="#" className="response__policy-text_type_link">
                  политикой обработки персональных данных
                </a>
              </div>
            </div>
            <div className="response__submit">
              <button
                type="submit"
                className={` ${
                  isValid && !isSuccessfulSending && (link.length !== 0 || (values.policy && resume))
                    ? "response__submit-button link-opacity"
                    : "response__submit-button response__submit-button_type_disabled"
                }`}
                disabled={
                  isValid && !isSuccessfulSending && (link.length !== 0 || (!!values.policy && !!resume))
                    ? ""
                    : "disabled"
                }
              >
                Откликнуться
              </button>
            </div>
          </form>
        </div>
      )}
      <SuccessfulSending isSuccessfulSending={isSuccessfulSending} />
    </>
  );
}

export default Response;
