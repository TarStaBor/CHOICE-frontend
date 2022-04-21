import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Application.css";
import applicantsLogo from "../../images/applicants.svg";
import deleteLogo from "../../images/delete.svg";
import copy from "../../images/copy.png";
import * as Api from "../../utils/Api";
import { FRONT_URL } from "../../utils/Constants";
import levelStyle from "../../utils/LevelStyle";

function Application(props) {
  const { company, level, logo, note, position, tags, todo, why, _id } = props.job;
  const delJob = props.delJob;

  // Стейт количества откликов на вакансию
  const [applicantsCount, setApplicantsCount] = useState("0");

  // Эффект обновления количества откликов
  useEffect(() => {
    Api.getApplicantsCount(_id)
      .then((res) => {
        setApplicantsCount(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }, [_id]);

  // Определение цвета уровня соискателя
  const levelColor = levelStyle(level);

  return (
    <>
      <section className="application">
        <div className="application__sections">
          <div className="application__header">
            <p className="application__id">ID: {_id}</p>
            <CopyToClipboard text={`${FRONT_URL}/response/${_id}`}>
              <div className="application__copy-button">
                <img className="application__copy-logo link-opacity" src={copy} alt="Скопировать ссылку"></img>
              </div>
            </CopyToClipboard>
            <div
              className="application__delete-button"
              onClick={() => {
                delJob(_id);
              }}
            >
              <img className="application__delete-logo link-opacity" src={deleteLogo} alt="Удалить"></img>
            </div>
          </div>
          <div className="application__company">
            <div className="application__container">
              <p className="application__position">{position}</p>
              <img className="application__logo" src={`http://${logo}`} alt="Лого компании"></img>
              <div className="application__applicants">
                <img className="application__applicants-logo" src={applicantsLogo} alt="Отозвалось"></img>
                <p className="application__applicants-count">{applicantsCount}</p>
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
