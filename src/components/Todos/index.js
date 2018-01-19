import React from 'react'
import TodoList from './TodoList'
import TodoInput from './TodoInput'

function Todos () {
  return (
    <div className='todos'>
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default Todos