import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/applicants.svg";
import { Validation } from "../../utils/Validation";
import Preloader from "../Preloader/Preloader";

function Login(props) {
  const { errorMesage, handleSubmit, isPreloader, blockInput } = props;
  const { values, handleChange, errors, isValid } = Validation();

  function Submite(evt) {
    evt.preventDefault();
    handleSubmit(values.email, values.password);
  }

  return (
    <section className="login">
      {isPreloader && <Preloader />}
      <form className="login__form" onSubmit={Submite}>
        <div className="login__header">
          <Link className="login__link" to="/">
            <img src={logo} className="login__logo link-opacity" alt="Логотип"></img>
          </Link>
          <h2 className="login__title">Рады видеть!</h2>
        </div>
        <div className="login__container">
          <p className="login__text">E-mail</p>

          <input
            className={`login__input ${errors.email && `login__input_type_error`}`}
            type="email"
            name="email"
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
            required
            autoComplete=""
            disabled={blockInput && "disabled"}
          />

          <p className={`login__error-text ${!errors.email && `login__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p>

          <p className="login__text">Пароль</p>
          <input
            className={`login__input ${errors.password && `login__input_type_error`}`}
            type="password"
            name="password"
            onChange={handleChange}
            autoComplete=""
            minLength="8"
            maxLength="30"
            required
            disabled={blockInput && "disabled"}
          />
          <p className={`login__error-text ${!errors.password && `login__error-text_type_disabled`}`}>
            {errors.password ? errors.password : "⁣"}
          </p>
        </div>
        <div className="login__submit">
          {errorMesage && <p className="login__submitError">{errorMesage}</p>}
          <button
            type="submit"
            className={`login__submit-button ${!isValid ? "login__submit-button_type_disable" : "link-opacity"}`}
          >
            Войти
          </button>
          <h2 className="login__reg-question">
            Ещё не зарегистрированы?
            <Link to="/signup" className="login__link link-opacity">
              Регистрация
            </Link>
          </h2>
        </div>
      </form>
    </section>
  );
}

export default Login;
