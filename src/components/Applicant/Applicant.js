// import React, { useState } from "react";
import "./Applicant.css";
import applicantsLogo from "../../images/applicants.svg";
import levelStyle from "../../utils/LevelStyle";

function Applicant() {
  const level = "junior";
  const isValid = true;
  const levelColor = levelStyle(level);

  return (
    <>
      <div className="applicant">
        <form className="applicant__sections">
          <div className="applicant__company">
            <div className="applicant__position">3D Artist</div>
            <img className="applicant__logo" src={applicantsLogo} alt="Логотип компании"></img>
            <div className="applicant__name">FuryLion</div>
          </div>
          <div className="applicant__tags">
            <div className={`applicant__level ${levelColor}`}>JUNIOR</div>
            <div className="applicant__tag">3D</div>
            <div className="applicant__tag">3D</div>
          </div>
          <div className="applicant__resume">
            <div className="applicant__resume-title">Добавьте файл с резюме</div>
            <label className="applicant__resume-button-label link-opacity">
              <input
                type="file"
                accept="image/*"
                // ref={fileInputRef}
                className="applicant__resume-button"
                name="logo"
                // onChange={handleLogoChange}
              ></input>
              Загрузить
            </label>
          </div>
          <div className="applicant__link">
            <div className="applicant__link-title">Или оставьте на него ссылку</div>
            <input type="text" className="applicant__link-input"></input>
          </div>
          <div className="applicant__policy">
            <input className="applicant__policy-input" type="checkbox" id="html" />
            <label className="applicant__policy-label" htmlFor="html">
              <span>Согласен с </span>
              <a href="#" className="applicant__policy_type_link">
                политикой обработки персональных данных
              </a>
            </label>
          </div>
          <div className="applicant__submit">
            <button
              type="submit"
              className={` ${
                !isValid
                  ? "applicant__submit-button applicant__submit-button_type_disabled"
                  : "applicant__submit-button link-opacity"
              }`}
              disabled={!isValid && "disabled"}
            >
              Откликнуться
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Applicant;
