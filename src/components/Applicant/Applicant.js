import React, { useState, useEffect } from "react";
import "./Applicant.css";
import applicantsLogo from "../../images/applicants.svg";
import deleteLogo from "../../images/delete.svg";
import levelStyle from "../../utils/LevelStyle";
import copy from "../../images/copy.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as Api from "../../utils/Api";

function Applicant(props) {
  const { comment, company, date, job, link, resume, _id } = props.applicant;

  function handleDownloadFile() {
    Api.downloadFile(resume, _id, date)
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
        {/* <a href={`http://${resume}`} download="sdsd">
          Download
        </a> */}
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
              <label className="applicant__download-button link-opacity" onClick={handleDownloadFile}>
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
