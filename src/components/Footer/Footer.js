import { NavLink } from "react-router-dom";
import "./Footer.css";
import logo from "../../images/logo.png";
// import Navigation from "../Navigation/Navigation";

function Footer() {
  // const { loggedIn } = props;
  // const pathName = window.location.pathname;

  const activeButton = ({ isActive }) =>
    isActive ? "footer__link link-opacity footer__link_type_active" : "footer__link link-opacity";

  return (
    <section className="footer">
      <NavLink to="/" className="footer__company">
        <img className="footer__logo" src={logo} alt="Логотип"></img>
        <h1 className="footer__company-name">CHOICE</h1>
      </NavLink>
    </section>
  );
}

export default Footer;
