import { SET_FILTER } from '../../constants/filterTypes'

export function setFilter (type) {
  return {
    type: SET_FILTER,
    filterType: type
  }
}