import {
  ADD_TODO,
  TOGGLE_TODO
} from '../../constants/todoTypes'

let uid = 0

const initialState = []

function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: uid++,
          text: action.data,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            completed: !item.completed
          }
        } else {
          return item
        }
      })
    default: {
      return state
    }
  }
}

export default todos;