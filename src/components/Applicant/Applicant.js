import React, { useState, useEffect } from "react";
import "./Applicant.css";
import deleteLogo from "../../images/delete.svg";
import copy from "../../images/copy.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as Api from "../../utils/Api";

function Applicant(props) {
  const { comment, company, date, job, link, resume, _id } = props.applicant;
  const delApplicant = props.delApplicant;
  function handleDownloadFile() {
    Api.downloadFile(resume, _id, company, job)
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
      <section className="applicant">
        <div className="applicant__sections">
          <div className="applicant__card">
            <div className="applicant__id">
              <h2 className="applicant__title">ID:</h2>
              <div className="applicant__field">{_id}</div>
            </div>

            <div className="applicant__date">
              <h2 className="applicant__title">Дата отклика:</h2>
              <div className="applicant__field">{date}</div>
            </div>

            <div className="applicant__comment">
              <h2 className="applicant__title">Комментарий:</h2>
              <div className="applicant__comment-field">{comment}</div>
            </div>
            <div className="applicant__download">
              <button
                className={`${
                  resume
                    ? "applicant__download-button link-opacity"
                    : "applicant__download-button applicant__download-button_type_disabled"
                }`}
                onClick={handleDownloadFile}
                disabled={resume ? "" : "disabled"}
              >
                Скачать CV
              </button>
            </div>

            <CopyToClipboard text={link}>
              <div className="applicant__link">
                <h2 className="applicant__title">Ссылка:</h2>

                <div className="applicant__link-control">
                  <div className="applicant__field">{link}</div>
                  <div className="applicant__copy-button">
                    <img className="applicant__copy-logo link-opacity" src={copy} alt="Скопировать ссылку"></img>
                  </div>
                </div>
              </div>
            </CopyToClipboard>
          </div>
          <div
            className="applicant__delete-button"
            onClick={() => {
              delApplicant(_id);
            }}
          >
            <img className="applicant__delete-logo" src={deleteLogo} alt="Удалить"></img>
          </div>
        </div>
      </section>
    </>
  );
}

export default Applicant;
