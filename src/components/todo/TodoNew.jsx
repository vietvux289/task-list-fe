import React from 'react'

const TodoNew = (props) => {
  const { addNewTodo } = props;
  addNewTodo();
    return (
      <div>
        <div className="todo-new">
          <input type="text" placeholder="Enter task..." />
          <button>Add</button>
        </div>
      </div>
    );
}

export default TodoNew
