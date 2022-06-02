import "./Main.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import menu from "../../images/menu.png";
import addTag from "../../images/addTag.png";
import applicants from "../../images/applicants.svg";
import deleteLogo from "../../images/delete.svg";

function Main(props) {
  const { loggedIn } = props;
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="main">
        <h1 className="main__title">Проект CHOICE</h1>
        <h2 className="main__subtitle">Данный проект - сервис по созданию вакансий и получению откликов</h2>

        <div className="main__container">
          <p className="main__text">
            Для просмотра - пройдите простую регистрацию. Укажите любую почту, на нее не будут приходить сообщения. Так
            же укажите простой пароль из 8 символов.
          </p>
        </div>

        <div className="main__container">
          <p className="main__text">
            Во вкладке <span className="main__text-title">Вакансии</span> отображаются все ранее созданные вакансии. У
            каждой карточки есть меню управления
            <img className="main__menu-image" src={menu} alt="меню карточки с вакансией" />, с помощью которого можно
            скопировать ссылку на вакансию и удалить вакансию. Скопированная ссылка является формой для создания отклика
            по вакансии, её можно использовать при создании вакансии в любом популярном мессенджере.
            <br /> При нажатии на иконку
            <img className="main__applicants-image" src={applicants} alt="меню карточки с вакансией" />
            отобразятся все отклики, сделанные по данной вакансии.
          </p>
        </div>

        <div className="main__container">
          <p className="main__text">
            Во вкладке <span className="main__text-title">Отклики</span> отображаются все отклики по существующим
            вакансиям. Кнопка <span className="main__text-title">Скачать CV</span> позволяет скачать загруженный
            соискателем файл - резюме.
            <br />
            Так же имеется возможность оставить пометки в поле <span className="main__text-title">Комментарий </span>
            или вовсе удалить ненужный отклик нажатием на иконку{" "}
            <img className="main__deleteLogo-image" src={deleteLogo} alt="меню карточки с вакансией" />
          </p>
        </div>

        <div className="main__container">
          <p className="main__text">
            Вкладка <span className="main__text-title">Создать вакансию</span> является формой - конструктором по
            созданию вакансии. Все поля - обязательные. Форма позволяет загрузить логотип компании. При нажатии на
            загруженный логотип он удалится.
            <br />
            Обязательным является добавление Тэгов. Добавляется введенный тэг нажатием на иконку
            <img className="main__addTag-image" src={addTag} alt="меню карточки с вакансией" /> или клавишей "Enter".
            Так же добавленный тэг можно удалить при нажатии по нему.
            <br />
            По умолчанию уровень соискателя - <span className="main__text-title">Intern</span>. При желании его можно
            поменять.
            <br /> Если все введенные поля - валидные, то активируется кнопка
            <span className="main__text-title"> Добавить</span>.
          </p>
        </div>

        <div className="main__container">
          <p className="main__text">
            Во вкладке <span className="main__text-title">Аккаунт</span> можно посмотреть свой профиль и выйти из
            аккаунта. В дальнейшем появится возможность редактирования профиля
          </p>
        </div>

        <div className="main__container">
          <p className="main__text">Проект является коммерческим и будет совершенствоваться.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Main;
