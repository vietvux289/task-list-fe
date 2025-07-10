import React, { useState } from "react";
import "./components/todo/todo.css";
import "./components/layout/header.css";
import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import Header from "./components/layout/header";
import reactLogo from "./assets/react.svg";

const App = () => {
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
    }
  
  return (
    <>
    <Header/>
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
    </>
  );
};

export default App;
