import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Response.css";
import check from "../../images/check-mark.svg";
import information from "../../images/information.svg";
import levelStyle from "../../utils/LevelStyle";
import { Validation } from "../../utils/Validation";
import fileFormatValidation from "../../utils/FileFormatValidation";
import fileSizeValidation from "../../utils/FileSizeValidation";
import AnswerPopup from "../AnswerPopup/AnswerPopup";
import Modal from "../Modal/Modal";
import { FORMATS, REGEXP } from "../../utils/Constants";
import Error from "../Error/Error";

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
  // Стейт ответа от сервера после отправки отклика
  const [responseAnswer, setResponseAnswer] = useState("");
  // Стейт открытия попапа результата отправки
  const [responsePopup, setResponsePopup] = useState(false);
  // Стейт сообщения невалидного типа файла
  const [filTypeError, setFilTypeError] = useState("");

  // Стейт ошибки при открытии страницы
  const [isError, setIsError] = useState(false);

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
        setIsError(true);
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
    if (fileSizeValidation(file.size)) {
      if (fileFormatValidation(file.type, extention)) {
        setResume(file);
        setFileIsValid(true);
      } else {
        setFilTypeError(`Файл формата ${extention} не подходит!`);
        setFileIsValid(false);
      }
    } else {
      console.log("Мы тут");
      setFilTypeError(`Файл должен быть не более 10 Мегабайт!`);
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
    formData.append("resume", resume);
    formData.append("link", link);
    formData.append("company", data.company);
    formData.append("jobId", _id);

    // for (let key of formData.keys()) {
    //   console.log(key, formData.get(key));
    // }

    Api.addResponse(formData)

      .then((res) => {
        setResponseAnswer({ title: "Спасибо!", subTitle: "Мы получили ваш отклик" });
      })
      .catch((err) => {
        setResponseAnswer({
          title: "Ой!",
          subTitle: "Мы не получили ваш отклик. Свяжитесь с нами для решения проблемы в телеграмм чате",
          link: "t.me/choice_applications",
        });
      })
      .finally(() => {
        setPreloader(false);
        setResponsePopup(true);
      });
  }

  return (
    <>
      {isPreloader && <Preloader />}
      {isError && <Error />}
      {data && (
        <div className="response">
          <form className="response__sections" onSubmit={Submit}>
            <div className="response__company">
              <div className="response__position">{data.position}</div>
              <img className="response__logo" src={data.logo} alt="Логотип компании"></img>
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

            <fieldset className="response__resume">
              <label className="response__resume-title">
                Добавьте файл с резюме
                <img
                  src={information}
                  onMouseOver={handleModalOpen}
                  onMouseOut={handleModalOpen}
                  className="response__modal"
                  alt=""
                />
                <Modal isModal={isModal} setIsModal={setIsModal} />
              </label>
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
            </fieldset>

            <fieldset className="response__link">
              <label className="response__link-title" htmlFor="link">
                Или оставьте на него ссылку
              </label>
              <input
                type="url"
                className={`response__link-input ${errors.link && "response__link-input_error"}`}
                name="link"
                id="link"
                onChange={handleLinkChange}
                minLength="2"
                maxLength="2048"
                autoComplete="off"
                // pattern={REGEXP}
              ></input>
              <span className="response__error-message">{errors.link}</span>
            </fieldset>

            <fieldset className="response__policy">
              <input
                type="checkbox"
                className="response__policy-input"
                name="policy"
                id="policy"
                onChange={handleChange}
                required
              />
              <label className="response__policy-label" htmlFor="policy"></label>
              <div className="response__policy-agreement">
                <span className="response__policy-agreement_type_text">Согласен с </span>
                <a
                  href="https://prime.ru/o-kompanii/soglashenie-dlya-obrabotki-personalnykh-dannykh-i-politika-konfidentsialnosti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="response__policy-agreement_type_link"
                >
                  политикой обработки персональных данных
                </a>
              </div>
            </fieldset>

            <fieldset className="response__submit">
              <button
                type="submit"
                className={` ${
                  isValid && (link.length !== 0 || (values.policy && resume))
                    ? "response__submit-button link-opacity"
                    : "response__submit-button response__submit-button_disabled"
                }`}
                disabled={isValid && (link.length !== 0 || (!!values.policy && !!resume)) ? "" : "disabled"}
              >
                Откликнуться
              </button>
            </fieldset>
          </form>
        </div>
      )}
      {responsePopup && <AnswerPopup responseAnswer={responseAnswer} />}
    </>
  );
}

export default Response;
