import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { setFilter } from '../../../actions'

import './index.css'

class Link extends Component {
  
  handleClick = () => {
    const {filter} = this.props
    filter(this.props.type)
  }

  render() {
    return (
      <Button onClick={this.handleClick}>{this.props.children}</Button>
    )
  }
  
}

function mapStateToProps (state) {
  return {
    filterState: state.filter
  }
}

function mapDispatchToProps (dispatch) {
  return {
    filter: (type) => dispatch(setFilter(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Link)