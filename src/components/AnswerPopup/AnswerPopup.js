import "./AnswerPopup.css";

function AnswerPopup(props) {
  const { responseAnswer } = props;
  return (
    <>
      <section className={`answerPopup answerPopup_opened`}>
        <div className="answerPopup__container">
          <p className="answerPopup__title">{responseAnswer.title}</p>
          <p className="answerPopup__subtitle">{responseAnswer.subTitle}</p>
        </div>
      </section>
    </>
  );
}

export default AnswerPopup;