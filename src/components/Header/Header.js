import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.png";

function Header(props) {
  const { loggedIn } = props;

  const activeButton = ({ isActive }) =>
    isActive ? "header__link link-opacity header__link_active" : "header__link link-opacity";

  return (
    <section className="header">
      <NavLink to="/" className="header__company">
        <img className="header__logo" src={logo} alt="Логотип"></img>
        <h1 className="header__company-name">CHOICE</h1>
      </NavLink>

      <nav className="header__nav">
        {loggedIn ? (
          <>
            <NavLink className={activeButton} to="/applications">
              Вакансии
            </NavLink>
            <NavLink className={activeButton} to="/applicants">
              Отклики
            </NavLink>
            <NavLink className={activeButton} to="/add-job">
              Создать вакансию
            </NavLink>
            <NavLink to="/profile" className={activeButton}>
              Аккаунт
            </NavLink>
          </>
        ) : (
          <>
            <div className="header__unauthorize-links">
              {process.env.REACT_APP_REGISTRATION && (
                <Link className="header__unauthorize-link" to="/signin">
                  <button className="header__button link-opacity">Войти</button>
                </Link>
              )}
              <Link className="header__unauthorize-link" to="/signup">
                <h2 className="header__link-title link-opacity">Регистрация</h2>
              </Link>
            </div>
          </>
        )}
      </nav>
    </section>
  );
}

export default Header;
