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

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <Container className="mt-4">
          <Row>
            <Col xs="12">
              <Form>
                <div className="d-flex">
                  <Input placeholder="Search..." />
                  <Button color="primary" >Search</Button>
                </div>
              </Form>
            </Col>
            <Col xs="12" lg="8" className="mt-4">
              <h1>FEED</h1>
            </Col>
            <Col xs="12" lg="4" className="mt-4">
              <h1>Additional Information</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
