import React, {Component} from 'react'
import Link from './Link'
import { FilterType } from '../../constants/filterTypes'

class Filter extends Component {

  render() {
    return (
      <div className="filter">
        <Link type={FilterType.ALL}>{FilterType.ALL}</Link>
        <Link type={FilterType.COMPLETED}>{FilterType.COMPLETED}</Link>
        <Link type={FilterType.UNCOMPLETED}>{FilterType.UNCOMPLETED}</Link>
      </div>
    )
  }
  
}

export default Filter