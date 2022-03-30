import Header from "../Header/Header";
import logo from "../../images/Banzai Games.png";
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
          <div>
            <h2 className="addJob__input-name">Название компании</h2>
            <input
              // className={`addJob__input ${errors.email && `login__input_type_error`}`}
              className="addJob__input"
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
          <div>
            <h2 className="addJob__input-name">Специализация</h2>
            <input
              // className={`addJob__input ${errors.email && `login__input_type_error`}`}
              className="addJob__input"
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
          <div class="container">
            <input class="hidden radio-label" id="intern" type="radio" name="accept-offers" />
            <label class="button-label" for="intern">
              <h1>INTERN</h1>
            </label>
            <input class="hidden radio-label" id="junior" type="radio" name="accept-offers" />
            <label class="button-label" for="junior">
              <h1>JUNIOR</h1>
            </label>
            <input class="hidden radio-label" id="middle" type="radio" name="accept-offers" />
            <label class="button-label" for="middle">
              <h1>MIDDLE</h1>
            </label>
            <input class="hidden radio-label" id="senior" type="radio" name="accept-offers" />
            <label class="button-label" for="senior">
              <h1>SENIOR</h1>
            </label>
            <input class="hidden radio-label" id="lead" type="radio" name="accept-offers" />
            <label class="button-label" for="lead">
              <h1>LEAD</h1>
            </label>
            <input class="hidden radio-label" id="director" type="radio" name="accept-offers" />
            <label class="button-label" for="director">
              <h1>DIRECTOR</h1>
            </label>
          </div>
          {/* ------------ */}
          <div>
            <h2 className="addJob__input-name">Тэг</h2>
            <input
              // className={`addJob__input ${errors.email && `login__input_type_error`}`}
              className="addJob__input"
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
          <div className="addJob__logo">
            <button className="header__logo-button">Логотип</button>
            <img className="header__logo-preview" src={logo} alt="Логотип"></img>
          </div>
          {/* ----------------- */}
          <div>
            <h2 className="addJob__input-name">Комментарий</h2>
            <input
              // className={`addJob__input ${errors.email && `login__input_type_error`}`}
              className="addJob__input"
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
          {/* ----------------- */}
          <div>
            <h2 className="addJob__input-name">Что делать:</h2>
            <textarea
              // className={`addJob__input ${errors.email && `login__input_type_error`}`}
              className="addJob__textarea"
              type="email"
              name="email"
              // onChange={handleChange}
              minLength="2"
              // maxLength="30"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          <div>
            <h2 className="addJob__input-name">Почему стоит откликнуться:</h2>
            <textarea
              // className={`addJob__input ${errors.email && `login__input_type_error`}`}
              className="addJob__textarea"
              type="email"
              name="email"
              // onChange={handleChange}
              minLength="2"
              // maxLength="30"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
              required
              autoComplete="off"
              // disabled={blockInput && "disabled"}
            />
            {/* <p className={`addJob__error-text ${!errors.email && `addJob__error-text_type_disabled`}`}>
            {errors.email ? errors.email : "⁣"}
          </p> */}
          </div>
          {/* ---------------- */}
          <div>
            <button type="submit" className="header__submit-button">
              Добавить
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddJob;
