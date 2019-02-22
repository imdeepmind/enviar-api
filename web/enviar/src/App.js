import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Input,
} from 'reactstrap';

import TopNav from './containers/topNav';
import Post from './components/post';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <div style={{height:"80px"}}></div>
        <Container>
          <Row>
            <Col xs="12">
              <Form>
                <div className="d-flex">
                  <Input placeholder="Search..." />
                  <Button color="primary" ><i className="fas fa-search"></i></Button>
                </div>
              </Form>
            </Col>
            <Col xs="12" lg="7" className="mt-4 ">
              <Post />
            </Col>
            <Col xs="12" lg="5" className="mt-4 d-none d-lg-flex">
              <h1>Additional Information</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
