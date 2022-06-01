import "./AddTags.css";
import { useState } from "react";
import cross from "../../images/cross.svg";

function AddTags(props) {
  const { tags, setTags } = props;

  const [userInput, setUserInput] = useState("");

  function handleInputChange(e) {
    setUserInput(e.currentTarget.value);
  }

  function handleRemoveTag(removeTag) {
    setTags([...tags.filter((tag) => tag !== removeTag)]);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (userInput) {
      setTags([...tags, userInput]);
      console.log(tags);
    }
    setUserInput("");
  }

  return (
    <>
      <div className="addTags">
        <label className="addJob__input-name" htmlFor="tag">
          Тэг
        </label>
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
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </>
  );
}

export default AddTags;
