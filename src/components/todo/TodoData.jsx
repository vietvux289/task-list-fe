import React from "react";

const TodoData = (props) => {
  const { todoList, deleteTodo } = props;

  const handleDeleteClick = (id) => {
    deleteTodo(id);
  }
  
  return (
    <div className="todo-data">
      {todoList.map((item, index) => {
        return (
          <div className="todo-item" key={item.id}>
            {item.name}
            <button style={{ cursor: "pointer" }} onClick={()=>handleDeleteClick(item.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
