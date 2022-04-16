import React, { useState, useEffect } from "react";
import "./Applicant.css";
import applicantsLogo from "../../images/applicants.svg";
import deleteLogo from "../../images/delete.svg";
import levelStyle from "../../utils/LevelStyle";
import copy from "../../images/copy.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as Api from "../../utils/Api";

function Applicant(props) {
  //   const { company, level, logo, note, position, tag, todo, why, _id } = props.job;
  //   const delJob = props.delJob;
  const [applicantsCount, setApplicantsCount] = useState("0");

  //   useEffect(() => {
  //     Api.getApplicantsCount(_id)
  //       .then((res) => {
  //         setApplicantsCount(res);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       })
  //       .finally(() => {});
  //   }, [_id]);

  //   const levelColor = levelStyle(level);

  return (
    <>
      <section className="applicant">
        <div className="applicant__sections">
          <div className="applicant__card">
            <div className="applicant__id">
              <h2 className="applicant__title">ID:</h2>
              <div className="applicant__field">125</div>
            </div>

            <div className="applicant__date">
              <h2 className="applicant__title">Дата отклика:</h2>
              <div className="applicant__field">25.03.2022</div>
            </div>

            <div className="applicant__comment">
              <h2 className="applicant__title">Комментарий:</h2>
              <div className="applicant__comment-field">
                Тут доТут должен быть комментарий, который оставит администраторлжен быть комментарий, который оставит
                администраторТут должен быть комментарий, который оставитТут должен быть комментарий, который оставит
                администраторТут должен быть комментарий, который оставит администратор администратор
              </div>
            </div>
            <div className="applicant__download">
              <label className="applicant__download-button link-opacity">
                {/* <input
                    type="file"
                    accept=".doc, .docx, .pdf, .ppt, .pptx, .jpeg, .jpg, .png, .zip, .7z"
                    ref={fileInputRef}
                    className="response__resume-button"
                    name="logo"
                    onChange={handleResumeChange}
                  ></input> */}
                Скачать CV
              </label>
            </div>

            <CopyToClipboard text={`Link`}>
              <div className="applicant__link">
                <h2 className="applicant__title">Ссылка:</h2>
                <div className="applicant__link-control">
                  <div className="applicant__field">
                    http://localhost005/applicantshttp://localhost005/applicantshttp://localhost005/applicantshttp://localhost005/applicants
                  </div>
                  <div className="applicant__copy-button">
                    <img className="applicant__copy-logo link-opacity" src={copy} alt="Скопировать ссылку"></img>
                  </div>
                </div>
              </div>
            </CopyToClipboard>
          </div>
          <div
            className="applicant__delete-button"
            //   onClick={() => {
            //     delJob(_id);
            //   }}
          >
            <img className="applicant__delete-logo" src={deleteLogo} alt="Удалить"></img>
          </div>
        </div>

        <div className="applicant__sections">
          <div className="applicant__card">
            <div className="applicant__id">
              <h2 className="applicant__title">ID:</h2>
              <div className="applicant__field">125</div>
            </div>

            <div className="applicant__date">
              <h2 className="applicant__title">Дата отклика:</h2>
              <div className="applicant__field">25.03.2022</div>
            </div>

            <div className="applicant__comment">
              <h2 className="applicant__title">Комментарий:</h2>
              <div className="applicant__comment-field">Тут должен быть комментарий, который оставит администратор</div>
            </div>
            <div className="applicant__download">
              <label className="applicant__download-button link-opacity">
                {/* <input
                    type="file"
                    accept=".doc, .docx, .pdf, .ppt, .pptx, .jpeg, .jpg, .png, .zip, .7z"
                    ref={fileInputRef}
                    className="response__resume-button"
                    name="logo"
                    onChange={handleResumeChange}
                  ></input> */}
                Скачать CV
              </label>
            </div>

            <CopyToClipboard text={`Link`}>
              <div className="applicant__link">
                <h2 className="applicant__title">Ссылка:</h2>
                <div className="applicant__link-control">
                  <div className="applicant__field">https://www.google.ru</div>
                  <div className="applicant__copy-button">
                    <img className="applicant__copy-logo link-opacity" src={copy} alt="Скопировать ссылку"></img>
                  </div>
                </div>
              </div>
            </CopyToClipboard>
          </div>
          <div
            className="applicant__delete-button"
            //   onClick={() => {
            //     delJob(_id);
            //   }}
          >
            <img className="applicant__delete-logo" src={deleteLogo} alt="Удалить"></img>
          </div>
        </div>
      </section>
    </>
  );
}

export default Applicant;
