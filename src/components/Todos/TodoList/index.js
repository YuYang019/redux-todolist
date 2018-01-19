import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FilterType } from '../../../constants/filterTypes'
import TodoItem from './TodoItem'

class TodoList extends Component {

  render() {
    const { todos } = this.props
    
    return (
      <div className="todo-list">
        {
          todos.map(item => 
            <TodoItem key={item.id} text={item.text} completed={item.completed} id={item.id}/>
          )
        }
      </div>
    )
  }

}

function selectVisibleTodo (todos, filter) {
  switch (filter) {
    case FilterType.ALL: 
      return todos
    case FilterType.COMPLETED:
      return todos.filter(item => item.completed)
    case FilterType.UNCOMPLETED:
      return todos.filter(item => !item.completed)
    default:
      return todos
  }
}

function mapStateToProps (state) {
  return {
    todos: selectVisibleTodo(state.todos, state.filter)
  }
}

export default connect(mapStateToProps)(TodoList)