import "./SuccessfulSending.css";

function SuccessfulSending(props) {
  const { isSuccessfulSending } = props;
  return (
    <>
      <section className={`successfulSending ${isSuccessfulSending && "successfulSending_opened"}`}>
        <div className="successfulSending__container">
          <p className="successfulSending__title">Спасибо!</p>
          <p className="successfulSending__subtitle">Мы получили ваш отклик</p>
        </div>
      </section>
    </>
  );
}

export default SuccessfulSending;
