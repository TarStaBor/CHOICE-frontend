import { NavLink } from "react-router-dom";
import "./Footer.css";
import logo from "../../images/logo.png";

function Footer() {
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
