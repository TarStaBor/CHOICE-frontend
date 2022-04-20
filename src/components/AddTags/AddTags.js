import "./AddTags.css";
import { useState } from "react";
import cross from "../../images/cross.svg";

function AddTags(props) {
  const { tags, setTags } = props;
  //Стейт содержимого инпута
  const [userInput, setUserInput] = useState("");

  // Функция обновления стейта содержимого инпута
  function handleChange(e) {
    setUserInput(e.currentTarget.value);
  }

  // Функция удаления тэга
  function handleRemoveTag(removeTag) {
    setTags([...tags.filter((tag) => tag !== removeTag)]);
  }

  // Функция добавления тэга по нажатию на Enter
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  // Функция добавления тэга
  function handleSubmit(e) {
    e.preventDefault();
    if (userInput) {
      setTags([...tags, userInput]);
    }
    setUserInput("");
  }

  return (
    <>
      <div className="addTags">
        <p className="addTags__input-name">Тэг</p>
        <img className="addTags__tag-add link-opacity" src={cross} alt="add_tag" onClick={handleSubmit}></img>
        {tags.map((tag, i) => {
          return (
            <div key={i} className="addTags__tag-item">
              <div className="addTags__tag" onClick={() => handleRemoveTag(tag)}>
                {tag}
              </div>
            </div>
          );
        })}
      </div>
      <input
        className={`addJob__input`}
        value={userInput}
        type="text"
        name="tag"
        id="tag"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
    </>
  );
}

export default AddTags;
