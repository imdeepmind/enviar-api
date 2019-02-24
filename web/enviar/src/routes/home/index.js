import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Form, Button, Input } from 'reactstrap';

import TopNav from '../../containers/topNav';
import Post from '../../components/higher/post';
import AdditionalInfo from '../../components/higher/additionalInfo';

import img1 from '../../assets/img/post_sample.jpg';
import img2 from '../../assets/img/post_sample2.jpg';


class Home extends Component{
    likePost = id =>{
        console.log(`Likked the post with id ${id}`);
    }
    commentPost = id => {
        console.log(`Comment the post with id ${id}`);
    }
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
                            <Post 
                                id={"12asdf"}
                                image={img2} 
                                name={"imdeepmind"} 
                                avatar={""}
                                text={"23 July, 12:03AM"}
                                title={"This is a sample post title"} 
                                likes={"514"}
                                likeMethod={() => this.likePost("12asdf")}
                                commentMethod={() => this.commentPost("12asdf")} />
                            <Post  
                                id={"13asdf"}
                                image={img1} 
                                name={"Freddie Mercury"} 
                                avatar={""}
                                text={"23 July, 12:03AM"}
                                title={"This is a sample post title"}
                                likes={"231"}
                                likeMethod={() => this.likePost("13asdf")}
                                commentMethod={() => this.commentPost("13asdf")} />
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