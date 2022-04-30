import "./Main.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main(props) {
  const { loggedIn } = props;
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="main">
        <h1>Раздел "Главная страница" в разработке</h1>
      </section>
      <Footer />
    </>
  );
}

export default Main;
