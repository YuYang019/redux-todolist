import {
  ADD_TODO,
  TOGGLE_TODO,
} from '../../constants/todoTypes'
import { addTodoApi } from '../../api/todos'

function addTodoAction(payload) {
  return {
    type: ADD_TODO,
    data: payload
  }
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id: id
  }
}

export const addTodo = (text) => (dispatch, getState) => {
  return addTodoApi(text)
    .then((data) => {
      dispatch(addTodoAction(text))
      console.log(data)
      return data
    })
}