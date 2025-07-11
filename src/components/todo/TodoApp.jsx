import React, { useState } from "react";
import "./todo.css";
import TodoNew from "./TodoNew";
import TodoData from "./TodoData";
import reactLogo from "../../assets/react.svg";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name,
    };
    setTodoList([...todoList, newTodo]);
  };

  const deleteTodo = (id) => {
    const newTodo = todoList.filter((item) => item.id !== id);
    setTodoList(newTodo);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Task list</div>
      <TodoNew addNewTodo={addNewTodo} />
      {/* length > 0 ? todolist : logo */}
      {todoList.length > 0 ? (
        <TodoData todoList={todoList} deleteTodo={deleteTodo} />
      ) : (
        <div className="todo-image">
          <img src={reactLogo} className="logo" alt="React logo" />
        </div>
      )}
    </div>
  );
};

export default TodoApp;

