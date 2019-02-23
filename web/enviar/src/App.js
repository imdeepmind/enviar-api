import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Input,
} from 'reactstrap';

import ReallySmoothScroll from 'really-smooth-scroll';

import TopNav from './containers/topNav';
import Post from './components/higher/post';
import AdditionalInfo from './components/higher/additionalInfo';

import img1 from './assets/img/post_sample.jpg';
import img2 from './assets/img/post_sample2.jpg';

ReallySmoothScroll.shim();

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
              <Post image={img2}/>
              <Post image={img1}/>
            </Col>
            <Col xs="12" lg="5" className="mt-4 d-none d-lg-block">
              <AdditionalInfo />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
