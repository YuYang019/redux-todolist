import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Menu, Icon, Card, Row, Col } from 'antd'
import Todos from '../Todos'
import Filter from '../Filter'

import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <Icon type="mail"/>
              <Link to="/">Input</Link>
            </Menu.Item>
            <Menu.Item key="app">
              <Icon type="appstore"/>
              <Link to="/Filter">Filter</Link>
            </Menu.Item>
          </Menu>

          <Row>
            <Col span={12} offset={6}>
              <Card>
                <Route exact path="/" component={Todos} />
                <Route path="/Todos" component={Todos} />
                <Route path="/Filter" component={Filter} />
              </Card>
            </Col>
          </Row>
        </div>
      </Router>
    );
  }
}

export default App;
