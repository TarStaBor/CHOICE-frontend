import { useNavigate } from "react-router";
import "./Error.css";

function Error() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="error">
      <div className="error__container">
        <div className="error__info">
          <h2 className="error__title">40 </h2>
          <span className="error__title error__title_broken">4</span>
          <h3 className="error__subtitle">Страница не найдена</h3>
        </div>
        <button className="error__exit-button link-opacity" onClick={goBack}>
          Назад
        </button>
      </div>
    </section>
  );
}

export default Error;
