import { FilterType, SET_FILTER } from '../../constants/filterTypes'

function filter (state = FilterType.ALL, action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.filterType
    }
    default: 
      return state
  }
}

export default filter