import { useNavigate } from "react-router";
import "./Policy.css";
import { policyData } from "../../utils/PolicyData";

function Policy() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="policy">
      <div className="policy__container">
        <h2 className="policy__title">Соглашение на обработку персональных данных</h2>
        <ul className="policy__list">
          {policyData.map((data) => (
            <li className="policy__subtitle">{data}</li>
          ))}
        </ul>
      </div>
      <button className="policy__exit-button link-opacity" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}

export default Policy;
