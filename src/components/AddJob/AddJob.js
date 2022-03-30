import Header from "../Header/Header";
import "./AddJob.css";
// import Promo from "../Promo/Promo";
// import NavTab from "../NavTab/NavTab";
// import AboutProject from "../AboutProject/AboutProject";
// import Techs from "../Techs/Techs";
// import AboutMe from "../AboutMe/AboutMe";
// import Portfolio from "../Portfolio/Portfolio";
// import Footer from "../Footer/Footer";

function AddJob() {
  return (
    <>
      <Header />
      <section className="addJob">
        <form className="addJob__form">
          <div className="addJob__company-name">
            <h2 className="addJob__input-name">Название компании</h2>
            <input
              // className={`addJob__input ${errors.email && `login__input_type_error`}`}
              className={`addJob__input`}
              type="email"
              name="email"
              // onChange={handleChange}
              minLength="2"
              maxLength="30"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          <div className="addJob__company-name">
            <h2 className="addJob__input-name">Название компании</h2>
            <input
              // className={`addJob__input ${errors.email && `login__input_type_error`}`}
              className={`addJob__input`}
              type="email"
              name="email"
              // onChange={handleChange}
              minLength="2"
              maxLength="30"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
        </form>
      </section>
    </>
  );
}

export default AddJob;
