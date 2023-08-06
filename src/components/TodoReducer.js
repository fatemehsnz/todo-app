"use client"; // This is a client component 👈🏽
import React ,{useState , useReducer} from 'react'
import TodoList from './TodoList'

const initTodo = {
    todos:[]
}

function TodoReducer() {

    const [enteredText,setEnteredText]  = useState('')

    const reducer = (state,action) =>{        /* action={type , data} */
        switch (action.type) {
            case 'ADD_TODO':
                if(action.data === '') return;
                return {
                    todos:[
                        ...state.todos,
                        {id: Math.random().toString(),
                            text : action.data
                        }
                    ]
                }
            case 'DELETE_TODO':
                return {
                    todos:state.todos.filter(item => item.id !== action.data)          
                }
            case 'UPDATE_TODO':
                return {
                        ...state.todos,
                        todos:state.todos.map((item) => {
                            if (item.id === action.data.id) {
                            item.text = action.data.text;
                            }
                            return item;
                        })
                           
                }
            default:
                return state
        }
    }
    const [todoList ,dispatch ] = useReducer(reducer , initTodo)

    const addInputTodoHandler = (e) => {
        if (e.key ==='Enter'){
            addTodoHandler()
        }
    }
    const addTodoHandler = ()=>{
        if (enteredText === "") return;
        dispatch({ type: 'ADD_TODO' , data : enteredText})
        setEnteredText('')
    }
    const deleteHandler = (id) =>{
        dispatch({ type: 'DELETE_TODO' , data :id})

    }
    const editHandler = (id , text) => {
        dispatch({ type: 'UPDATE_TODO' , data :{id , text}})       
    }
    return (
        <div>
            <h2 >What is the Plan for Today</h2>
            <input className='input' value={enteredText} onChange ={(e)=>{setEnteredText(e.target.value)}} onKeyDown={addInputTodoHandler}  type="text" placeholder='Add a todo' />
            <button className='btn' onClick={addTodoHandler} >Add Todo</button>
            <TodoList list = {todoList.todos} deleteItem= {deleteHandler} editItem = {editHandler} />
        </div>
    )

}

export default TodoReducer
