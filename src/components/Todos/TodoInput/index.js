import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Form, Icon, Button, message } from 'antd'
import { addTodo } from '../../../actions'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TodoInput extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      loading: false,
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    const { addTodo } = this.props
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          loading: true
        })
        addTodo(values.text)
          .then(data => {
            this.setState({
              loading: false
            })
            if (data) {
              message.success('添加成功')
            } else {
              message.error('添加失败')
            }
          })
          .catch(err => {
            this.setState({
              loading: false
            })
            message.error('添加失败')
          })
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const textError = isFieldTouched('text') && getFieldError('text');

    return (
      <div className="input">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={textError ? 'error' : ''}
            help={textError || ''}
          >
            {
              getFieldDecorator('text', {
                rules: [{ required: true, message: 'Please input your todo!' }],
              })(
                <Input prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Todo" />
              )
            }
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
              disabled={hasErrors(getFieldsError())}
            >
              Add Todo
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  } 
}

const WrappedTodoInput  = Form.create()(TodoInput)

function mapDispatchToProps (dispatch) {
  return {
    addTodo: (text) => dispatch(addTodo(text))
  }
}

export default connect(null, mapDispatchToProps)(WrappedTodoInput)