import "./AskPopup.css";

function AskPopup(props) {
  const { delJob, _id, setIsAskPopup } = props;
  return (
    <>
      <section className="askPopup askPopup_opened">
        <div className="askPopup__container">
          <p className="askPopup__title">Вы точно хотите удалить вакансию?</p>
          <p className="askPopup__subtitle">Удалятся все отлики по данной вакансии</p>
          <div className="askPopup__buttons">
            <button className="askPopup__button link-opacity" onClick={() => delJob(_id)}>
              Да
            </button>
            <button className="askPopup__button link-opacity" onClick={() => setIsAskPopup(false)}>
              Нет
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default AskPopup;
