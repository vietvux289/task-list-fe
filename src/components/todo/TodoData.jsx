import React from 'react'

const TodoData = (props) => {
    return (
      <div>
        <div className="todo-data">
          <div>Learning React</div>
          <div>Watching Youtube</div>
          <div>My name is {props.name}</div>
        </div>
      </div>
    );
}

export default TodoData
