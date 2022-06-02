import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.png";
import { Validation } from "../../utils/Validation";

function Register(props) {
  const { errorMesage, handleSubmit, blockInput } = props;
  const { values, handleChange, errors, isValid } = Validation();
  function Submite(evt) {
    evt.preventDefault();
    handleSubmit(values.name, values.email.toLowerCase(), values.password);
  }

  return (
    <section className="register">
      <form className="register__form" onSubmit={Submite}>
        <div className="register__header">
          <Link className="register__link" to="/">
            <img src={logo} className="register__logo link-opacity" alt="Логотип"></img>
          </Link>
          <h2 className="register__title">Добро пожаловать!</h2>
        </div>
        <div className="register__container">
          <p className="register__text">Имя</p>
          <input
            className={`register__input ${errors.name && `register__input_type_error`}`}
            type="name"
            name="name"
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            pattern="^[A-Za-zА-Яа-я\s]{1,}$"
            required
            autoComplete="off"
            disabled={blockInput && "disabled"}
          />
          <p className={`register__error-text ${!errors.name && `register__error-text_type_disabled`}`}>
            {errors.name ? errors.name : "⁣"}
          </p>
          <p className="register__text">E-mail</p>
          <input
            className={`register__input ${errors.email && `register__input_type_error`}`}
            type="email"
            name="email"
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
            required
            disabled={blockInput && "disabled"}
          />
          <p className={`register__error-text ${!errors.email && `register__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p>
          <p className="register__text">Пароль</p>
          <input
            className={`register__input ${errors.password && `register__input_type_error`}`}
            type="password"
            name="password"
            onChange={handleChange}
            minLength="8"
            maxLength="30"
            required
            disabled={blockInput && "disabled"}
          />
          <p className={`register__error-text ${!errors.password && `register__error-text_type_disabled`}`}>
            {errors.password ? errors.password : "⁣"}
          </p>
        </div>
        <div className="register__submit">
          {errorMesage && <p className="register__submitError">{errorMesage}</p>}
          <button
            type="submit"
            className={`register__submit-button ${!isValid ? "register__submit-button_type_disable" : "link-opacity"}`}
          >
            Зарегистрироваться
          </button>
          <h2 className="register__reg-question">
            Уже зарегистрированы?
            <Link to="/signin" className="register__link link-opacity">
              Войти
            </Link>
          </h2>
        </div>
      </form>
    </section>
  );
}

export default Register;
