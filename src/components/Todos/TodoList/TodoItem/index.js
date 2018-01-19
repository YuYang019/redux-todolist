import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Tag } from 'antd'
import { toggleTodo } from '../../../../actions'

import './index.css'

class TodoItem extends Component {
  
  handleClick = (e) => {
    const {toggleTodo} = this.props
    toggleTodo(this.props.id)
  }

  render () {
    return (
      <li className="item">
        <Row>
          <Col span={16}>
            <span className="todo-name">
              {this.props.text}
            </span>
            <Tag color={this.props.completed ? 'green' : 'red'}>
              { this.props.completed ? '已完成' : '未完成' }
            </Tag>
          </Col>
          <Col span={6}>
            <Button onClick={this.handleClick} size="small">切换状态</Button>
          </Col>
        </Row>
      </li>
    )
  }
  
}

function mapDispatchToProps (dispatch) {
  return {
    toggleTodo: (id) => dispatch(toggleTodo(id))
  }
}

export default connect(null, mapDispatchToProps)(TodoItem)