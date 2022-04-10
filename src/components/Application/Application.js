// import React, { useState } from "react";
import "./Application.css";
import applicantsLogo from "../../images/applicants.svg";
import levelStyle from "../../utils/LevelStyle";

function Application(props) {
  const { company, level, logo, note, position, tag, todo, why, _id, applicants } = props.job;
  const levelColor = levelStyle(level);

  return (
    <>
      <section className="application">
        <h2 className="application__id">ID: {_id}</h2>
        <div className="application__sections">
          <div className="application__company">
            <div className="application__container">
              <h2 className="application__position">{position}</h2>
              <img className="application__logo" src={`http://${logo}`} alt="Лого компании"></img>
              <div className="application__applicants">
                <img className="application__applicants-logo" src={applicantsLogo} alt="Отозвалось"></img>
                <p className="application__applicants-count">{applicants}</p>
              </div>
              <h2 className="application__note">{note}</h2>
              <h2 className="application__name">{company}</h2>
              <div className="application__tags">
                <h1 className={`application__level ${levelColor}`}>{level.toUpperCase()}</h1>
                {tag.map((t, i) => {
                  return (
                    <div key={i} className="application__tag">
                      {t.toUpperCase()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="application__todo">
            <h2 className="application__title">Что делать:</h2>
            <p className="application__subtitle">{todo}</p>
          </div>
          <div className="application__why">
            <h2 className="application__title">Почему стоит откликнуться:</h2>
            <h2 className="application__subtitle">{why}</h2>
          </div>
        </div>
      </section>
    </>
  );
}

export default Application;
