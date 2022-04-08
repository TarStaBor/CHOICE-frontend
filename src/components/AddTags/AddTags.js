import "./AddTags.css";
import { useState } from "react";
import cross from "../../images/cross.svg";

function AddTags(props) {
  const { tags, setTags } = props;

  const addTask = (userInput) => {
    if (userInput) {
      setTags([...tags, userInput]);
    }
  };

  const removeTask = (removeTag) => {
    setTags([...tags.filter((tag) => tag !== removeTag)]);
  };

  // -------------------TodoForm--------------
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
    addTask(userInput);
    setUserInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <>
      <div className="addTags">
        <h2 className="addTags__input-name">Тэг</h2>
        <img className="addTags__tag-add link-opacity" src={cross} alt="add_tag" onClick={handleSubmit}></img>
        {tags.map((tag, i) => {
          return (
            <div key={i} className="addTags__tag-item">
              <div className="addTags__tag" onClick={() => removeTask(tag)}>
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
