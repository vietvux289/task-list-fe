import React, { useState } from "react";

const TodoNew = (props) => {
  const [valueInput, setValueInput] = useState("");

  const { addNewTodo } = props;

  const handleAddClick = () => {
    addNewTodo(valueInput); 
    setValueInput("")
  };

  const handleOnChange = (name) => {
    setValueInput(name);
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
        <button style={{ cursor: "pointer" }} onClick={handleAddClick}>
          Add
        </button>
      </div>

      <div className="inputted-text">Text inputted: {valueInput}</div>
    </>
  );
};

export default TodoNew;
