import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Response.css";
import check from "../../images/check-mark.svg";
import information from "../../images/information.svg";
import levelStyle from "../../utils/LevelStyle";
import { Validation } from "../../utils/Validation";
import { fileFormatValidation } from "../../utils/FileFormatValidation";
import fileSizeValidation from "../../utils/FileSizeValidation";
import AnswerPopup from "../AnswerPopup/AnswerPopup";
import Modal from "../Modal/Modal";
import { FORMATS } from "../../utils/Constants";
import Error from "../Error/Error";
import { Link } from "react-router-dom";

import * as Api from "../../utils/Api";
import Preloader from "../Preloader/Preloader";

function Response(props) {
  const { isPreloader, setPreloader } = props;
  const { values, handleChange, errors, isValid } = Validation();

  const [data, setData] = useState();
  const [resumeFile, setResumeFile] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [fileIsValid, setFileIsValid] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [responseAnswer, setResponseAnswer] = useState("");
  const [responsePopup, setResponsePopup] = useState(false);
  const [fileTypeError, setFileTypeError] = useState("");
  // Error when getting a job
  const [isError, setIsError] = useState(false);

  const fileInputRef = useRef();
  const { _id } = useParams();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  function handleResumeFileChange(e) {
    const file = e.target.files[0];
    const extention = file.name.split(".").pop();
    if (fileSizeValidation(file.size)) {
      if (fileFormatValidation(file.type, extention)) {
        setResumeFile(file);
        setFileIsValid(true);
      } else {
        setFileTypeError(`Файл формата ${extention} не подходит!`);
        setFileIsValid(false);
      }
    } else {
      setFileTypeError(`Файл должен быть не более 10 Мегабайт!`);
      setFileIsValid(false);
    }

    e.target.value = null;
  }

  function handleResumeLinkChange(e) {
    handleChange(e);
    setResumeLink(e.target.value);
  }

  function handleModalOpen() {
    setIsModal(!isModal);
  }

  function Submit(evt) {
    evt.preventDefault();
    setPreloader(true);
    let formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("link", resumeLink);
    formData.append("company", data.company);
    formData.append("jobId", _id);

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
                      onChange={handleResumeFileChange}
                    ></input>
                    Загрузить
                  </label>
                  <span className="response__fileValidError-message">{fileTypeError}</span>
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
                onChange={handleResumeLinkChange}
                minLength="2"
                maxLength="2048"
                autoComplete="off"
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

                <Link className="response__policy-agreement_type_link" to="/policy">
                  политикой обработки персональных данных
                </Link>
              </div>
            </fieldset>

            <fieldset className="response__submit">
              <button
                type="submit"
                className={` ${
                  isValid && (resumeLink.length !== 0 || (values.policy && resumeFile))
                    ? "response__submit-button link-opacity"
                    : "response__submit-button response__submit-button_disabled"
                }`}
                disabled={isValid && (resumeLink.length !== 0 || (!!values.policy && !!resumeFile)) ? "" : "disabled"}
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
