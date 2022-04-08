import "./Search.css";
import magnifier from "../../images/magnifier.svg";

function Search(props) {
  const { setSearchValue, searchValue } = props;

  function handleEdit(evt) {
    setSearchValue(evt.target.value);
  }
  return (
    <>
      <section className="search">
        <form
          className="search__search-container"
          onSubmit={(evt) => {
            evt.preventDefault();
            // handleFilter(arrayforSearch);
          }}
        >
          <img src={magnifier} className="search__magnifier" alt="Изображение лупы"></img>
          <input
            className="search__search-input"
            type="text"
            name="searchValue"
            value={searchValue}
            required
            onChange={handleEdit}
          ></input>
          <button className="search__findArrow link-opacity" type="submit"></button>
        </form>
      </section>
    </>
  );
}

export default Search;
