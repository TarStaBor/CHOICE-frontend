import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Application.css";
import applicantsLogo from "../../images/applicants.svg";
import deleteLogo from "../../images/delete.svg";
import copy from "../../images/copy.png";
import AskPopup from "../AskPopup/AskPopup";
import levelStyle from "../../utils/LevelStyle";

function Application(props) {
  const { applicants, company, level, logo, note, position, tags, todo, why, _id } = props.job;
  const delJob = props.delJob;
  const getFilterApplicants = props.getFilterApplicants;

  const [isAskPopup, setIsAskPopup] = useState(false);

  const FRONT_URL = process.env.REACT_APP_FRONT_URL;
  const levelColor = levelStyle(level);

  function handleFilterApplicants() {
    getFilterApplicants(_id);
  }

  function handleOpenPopup() {
    setIsAskPopup(true);
  }

  return (
    <>
      {isAskPopup && <AskPopup delJob={delJob} _id={_id} setIsAskPopup={setIsAskPopup} />}
      <section className="application">
        <div className="application__sections">
          <div className="application__header">
            <p className="application__id">ID: {_id}</p>
            <CopyToClipboard text={`${FRONT_URL}/response/${_id}`}>
              <div className="application__copy-button">
                <img className="application__copy-logo link-opacity" src={copy} alt="Скопировать ссылку"></img>
              </div>
            </CopyToClipboard>
            <div className="application__delete-button" onClick={handleOpenPopup}>
              <img className="application__delete-logo link-opacity" src={deleteLogo} alt="Удалить"></img>
            </div>
          </div>
          <div className="application__company">
            <div className="application__container">
              <p className="application__position">{position}</p>
              <img className="application__logo" src={logo} alt={`Лого компании ${company}`}></img>
              <div className="application__applicants link-opacity" onClick={handleFilterApplicants}>
                <img className="application__applicants-logo" src={applicantsLogo} alt="Отозвалось"></img>
                <p className="application__applicants-count">{applicants}</p>
              </div>
              <p className="application__note">{note}</p>
              <p className="application__name">{company}</p>
              <div className="application__tags">
                <p className={`application__level ${levelColor}`}>{level.toUpperCase()}</p>
                {tags.map((tag, i) => {
                  return (
                    <div key={i} className="application__tag">
                      {tag.toUpperCase()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="application__todo">
            <p className="application__title">Что делать:</p>
            <p className="application__subtitle">{todo}</p>
          </div>
          <div className="application__why">
            <p className="application__title">Почему стоит откликнуться:</p>
            <p className="application__subtitle">{why}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Application;
