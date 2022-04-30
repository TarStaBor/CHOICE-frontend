import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/Context";
import "./Profile.css";
import Header from "../Header/Header";
import { Validation } from "../../utils/Validation";
import Preloader from "../Preloader/Preloader";

function Profile(props) {
  const {
    // setEdit,
    // handleUpdateUser,
    handleloggedOutClick,
    // setSuccessEditProfile,
    edit,
    // errorMesage,
    loggedIn,
    isPreloader,
    blockInput,
    // successEditProfile,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = Validation();

  // function handleEdit(e) {
  //   e.preventDefault();
  //   setEdit(true);
  // }

  // function handleSubmit(evt) {
  //   evt.preventDefault();

  //   handleUpdateUser(values.name ? values.name : currentUser.name, values.email ? values.email : currentUser.email);
  // }

  // // Эффект очистки состояния стейта успешного редактирования после размонтирования компонента
  // useEffect(() => {
  //   values.name = currentUser.name;
  //   values.email = currentUser.email;
  //   return () => {
  //     setSuccessEditProfile(false);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // // Эффект скрытия сообщения об успешном изменении при повторном нажатии на редактирование
  // useEffect(() => {
  //   edit && setSuccessEditProfile(false);
  // }, [edit, setSuccessEditProfile]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        {isPreloader && <Preloader />}
        <form className="profile__form">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <div className="profile__container">
            <p className={`profile__error-text ${!errors.name && `profile__error-text_type_disabled`}`}>
              {errors.name ? errors.name : "⁣"}
            </p>
            <div className="profile__form-element">
              <p className="profile__text">Имя</p>
              <input
                className={`profile__input ${errors.name && `profile__input_type_error`}`}
                type="name"
                name="name"
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                required
                autoComplete="off"
                defaultValue={currentUser.name}
                disabled={(!edit || blockInput) && "disabled"}
              />
            </div>
            <div className="profile__form-element">
              <p className="profile__text">E&#8209;mail</p>

              <input
                className={`profile__input ${errors.email && `profile__input_type_error`}`}
                type="email"
                name="email"
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                required
                defaultValue={currentUser.email}
                disabled={(!edit || blockInput) && "disabled"}
              />
            </div>
            <p className={`profile__error-text ${!errors.email && `profile__error-text_type_disabled`}`}>
              {errors.email ? errors.email : "⁣"}
            </p>
          </div>
          <div className="profile__exit">
            {/* {successEditProfile && <p className="profile__successMessage">Профиль изменен успешно</p>}
            {!edit ? (
              <button className="profile__button link-opacity" onClick={handleEdit}>
                Редактировать
              </button>
            ) : (
              <div className="profile__saveContainer">
                {errorMesage && <p className="profile__submitError">{errorMesage}</p>}
                <button
                  type="submit"
                  className={`profile__submit-button ${
                    !isValid || (values.name === currentUser.name && values.email === currentUser.email)
                      ? "profile__submit-button_type_disable"
                      : "link-opacity"
                  }`}
                  disabled={
                    !isValid || (values.name === currentUser.name && values.email === currentUser.email)
                      ? "disabled"
                      : ""
                  }
                  onClick={handleSubmit}
                >
                  Сохранить
                </button>
              </div>
            )} */}
            <button className="profile__exit-button link-opacity" onClick={handleloggedOutClick} type="submite">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
