"use client"; // This is a client component 👈🏽
import React from 'react' 
import TodoItem from './TodoItem'

function TodoList(props) {
    
    
    return (
        <div>
        <ul className='list'>
            {props.list.map((item)=>{
                return (
                    <TodoItem key={item._id} item = {item} editItem = {props.editItem} deleteItem={props.deleteItem}/>
                )
            })}
            
        </ul>
        </div>
    )
}

export default TodoList
