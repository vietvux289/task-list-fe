import React from "react";
import './components/todo/todo.css'
import { FaTrash, FaEdit, FaArrowsAlt } from "react-icons/fa";
import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import reactLogo from "./assets/react.svg"

const App = () => {
  const name = 'VietVH';
  const data = {
    age: 18,
    address: "Nam Dinh"
  }

  const addNewTodo = () => {
    alert('alo alo')
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Task list</div>
      <TodoNew addNewTodo={addNewTodo} />
      <TodoData name={name} address={data.address} />
      <div className="todo-image">
        <img src={reactLogo} className="logo" alt="React logo" />
      </div>
    </div>
  );
}

export default App;
