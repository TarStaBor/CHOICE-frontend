import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Applicant.css";
import deleteLogo from "../../images/delete.svg";
import copy from "../../images/copy.png";
import * as Api from "../../utils/Api";
import moment from "moment/min/moment-with-locales";

function Applicant(props) {
  const { comment, createdAt, job, link, resume, _id } = props.applicant;
  const delApplicant = props.delApplicant;
  const setPreloader = props.setPreloader;
  const handleCommentChange = props.handleCommentChange;

  function handleDownloadFile() {
    setPreloader(true);
    Api.downloadFile(resume, _id, job)
      .then((res) => {
        console.log(`Скачивание файла ${resume}`);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  function commentChange(e) {
    if (e.target.textContent !== comment) {
      handleCommentChange(e.target.textContent, _id);
    }
  }

  return (
    <>
      <section className="applicant">
        <div className="applicant__sections">
          <div className="applicant__card">
            <div className="applicant__id">
              <p className="applicant__title">ID:</p>
              <div className="applicant__field">{_id}</div>
            </div>

            <div className="applicant__date">
              <p className="applicant__title">Дата отклика:</p>
              <div className="applicant__field">{moment.utc(createdAt).local().format("DD.MM.YYYY в HH:mm:ss")}</div>
            </div>

            <div className="applicant__comment">
              <p className="applicant__title">Комментарий:</p>
              <div
                contentEditable="true"
                className="applicant__comment-field"
                onBlur={commentChange}
                suppressContentEditableWarning={true}
              >
                {comment}
              </div>
            </div>
            <div className="applicant__download">
              <button
                className={`${
                  resume
                    ? "applicant__download-button link-opacity"
                    : "applicant__download-button applicant__download-button_disabled"
                }`}
                onClick={handleDownloadFile}
                disabled={resume ? "" : "disabled"}
              >
                Скачать CV
              </button>
            </div>

            <CopyToClipboard text={link}>
              <div className="applicant__link">
                <p className="applicant__title">Ссылка:</p>

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
