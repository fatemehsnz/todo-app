"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import axios from "axios";

function Todo() {
  const [todoList, setTodolist] = useState([]);
  const [enteredText, setEnteredText] = useState("");
  const [refresh, setRefresh] = useState(false);

  const addTodoHandler = () => {
    if (enteredText === "") return;
    // setTodolist(
    //   todoList.concat({
    //     id: Math.random().toString(),
    //     text: enteredText,
    //   })
    // );
    axios
      .post(`/api/set_todo`, { todo: enteredText })
      .then((res) => {
        setEnteredText("");
        setRefresh(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get(`/api/get_todo`).then((res) => {
      setTodolist(res.data);
    });
  }, [refresh]);

  const addInputTodoHandler = (e) => {
    if (e.key === "Enter") {
      addTodoHandler();
    }
  };
  const deleteHandler = (id) => {
    // const newList = todoList.filter((item) => item.id !== id);
    // setTodolist(newList);
    console.log(typeof(id));
    axios
      .delete(`/api/delete_todo/`,{data :{id}})
      .then((res) => {
        console.log(res);
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editHandler = (id, newText, text) => {
    // setTodolist(
    //   todoList.map((item) => {
    //     if (item.id === id) {
    //       item.text = newText;
    //     }
    //     return item;
    //   })
    // );
    if (newText === text) return;
    axios
      .put(`/api/update_todo/`, { id, todo: newText })
      .then((res) => {
        console.log(res);
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>What is the Plan for Today</h2>
      <input
        className="input"
        onChange={(e) => {
          setEnteredText(e.target.value);
        }}
        onKeyDown={addInputTodoHandler}
        value={enteredText}
        type="text"
        placeholder="Add a todo"
      />
      <button className="btn" onClick={addTodoHandler}>
        Add Todo
      </button>
      <TodoList
        list={todoList}
        deleteItem={deleteHandler}
        editItem={editHandler}
      />
    </div>
  );
}

export default Todo;
