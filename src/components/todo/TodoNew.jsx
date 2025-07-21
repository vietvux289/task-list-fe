import React, { useState } from "react";
import "../../styles/todo.new.css";

const TodoNew = (props) => {
  const [valueInput, setValueInput] = useState("");
  const { addNewTodo } = props;

  const handleOnChange = (name) => {
    setValueInput(name);
  };

  const handleAddClick = () => {
    if (valueInput.trim() === "") {
      alert("⚠️ Name of task cannot be empty!");
    } else {
      addNewTodo(valueInput);
      setValueInput("");
    }
  };

  return (
    <>
      <div className="todo-new">
        <input
          type="text"
          placeholder="Enter task..."
          onChange={(event) => handleOnChange(event.target.value)}
          value={valueInput}
        />
        <button onClick={handleAddClick}>Add</button>
      </div>

      <div className="inputted-text">New task: {valueInput}</div>
    </>
  );
};

export default TodoNew;
