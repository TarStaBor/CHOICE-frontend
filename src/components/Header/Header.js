import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.png";
// import Navigation from "../Navigation/Navigation";

function Header() {
  // const { loggedIn } = props;
  // const pathName = window.location.pathname;

  const activeButton = ({ isActive }) =>
    isActive ? "header__link link-opacity header__link_active" : "header__link link-opacity";

  return (
    <section className="header">
      <NavLink to="/" className="header__company">
        <img className="header__logo" src={logo} alt="Логотип"></img>
        <h1 className="header__company-name">CHOICE</h1>
      </NavLink>

      <div className="header__nav">
        <NavLink className={activeButton} to="/applications">
          Все вакансии
        </NavLink>
        <NavLink className={activeButton} to="/applicants">
          Отклики
        </NavLink>
        <NavLink className={activeButton} to="/add-job">
          Новая вакансия
        </NavLink>
      </div>
    </section>
  );
}

export default Header;
