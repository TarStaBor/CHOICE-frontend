// import React, { useState } from "react";
import "./Application.css";
import logo from "../../images/FuryLion.png";
import applicants from "../../images/applicants.svg";

function Application() {
  return (
    <>
      <section className="application">
        <h2 className="application__id">ID: 01010101</h2>
        <div className="application__sections">
          <div className="application__company">
            <div className="application__container">
              <h2 className="application__position">3D Artist</h2>
              <img className="application__logo" src={logo} alt="Лого компании"></img>
              <div className="application__applicants">
                <img className="application__applicants-logo" src={applicants} alt="Отозвалось"></img>
                <p className="application__applicants-count">195</p>
              </div>
              <h2 className="application__note">Крутая компания, обращаются 3-й раз</h2>
              <h2 className="application__name">FuryLion</h2>
              {/* <label className="application__label" htmlFor="intern"> */}

              {/* </label> */}
              <div className="application__tags">
                <h1 className="application__label">JUNIOR</h1>
                <div className="application__tag">3D</div>
                <div className="application__tag">Moscow</div>
              </div>
            </div>
          </div>
          <div className="application__todo">
            <h2 className="application__title">Что делать:</h2>
            <p className="application__subtitle">1. Работа с ZBrush, Maya, Substance Painter, Photoshop</p>
            <p className="application__subtitle">2. Разработка различных моделей</p>
          </div>
          <div className="application__why">
            <h2 className="application__title">Почему стоит откликнуться:</h2>
            <p className="application__subtitle">1. Работа на ААА-проектами</p>
            <p className="application__subtitle">2. Работа в известной компании</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Application;
