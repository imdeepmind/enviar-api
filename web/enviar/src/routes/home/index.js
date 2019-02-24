import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Form, Button, Input } from 'reactstrap';

import TopNav from '../../containers/topNav';
import Post from '../../components/higher/post';
import AdditionalInfo from '../../components/higher/additionalInfo';

import img1 from '../../assets/img/post_sample.jpg';
import img2 from '../../assets/img/post_sample2.jpg';


class Home extends Component{
    render(){
        return (
            <Fragment>
                <TopNav />
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
            </Fragment>
        )
    }
}

export default Home;