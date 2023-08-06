import React, { useState } from "react";

function TodoItem(props) {
  const [editing, setEditing] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [isChecked,setIsChecked] = useState(false)
  let viewMode = {};
  let editMode = {};
  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }
  const editHandle = () => {
    setEditing(true);
    setUpdateText(props.item.todo);
  };
  const updateHandle = () => {
    props.editItem(props.item._id, updateText);
    setEditing(false);
  };
  const updateTodoHandler = (e) => {
    if (e.key === "Enter") {
      updateHandle();
    }
  };
  const handleCheckboxChange = e =>{
    setIsChecked(e.target.checked)
  }
  return (
    <li className="todo" key={props.item._id}>
      <div style={viewMode}>
        <input className="check" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}></input>
        <p className={isChecked ? "line-through" : "title"}>{props.item.todo}</p>
        <div>
          <button className="delete-btn" type="submit" onClick={() => props.deleteItem(props.item._id)}>
            delete
          </button>
          <button className="edit-btn" type="submit" onClick={editHandle}>
            edit
          </button>
        </div>
        <div className="solid"></div>
      </div>
      <div style={editMode}>
        <input className="update"
          value={updateText}
          onChange={(e) => {
            setUpdateText(e.target.value);
          }}
          onKeyDown={updateTodoHandler}
        />
        <button className="edit-btn" onClick={updateHandle}>update</button>
        <div className="solid"></div>
      </div>
    </li>
  );
}

export default TodoItem;
