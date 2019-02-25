import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import TopNav from '../../containers/topNav';
import Avatar from '../../components/lower/avatar';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab: "1",
        }
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab
            });
        }
    }
    render(){
        return (
            <Fragment>
                <TopNav />
                <Container>
                    <Row className="border-bottom">
                        <Col xs="12" lg="4" className="p-5 d-flex justify-content-center align-items-center">
                            <Avatar width="200px" source="" />
                        </Col>
                        <Col xs="12" lg="8" className="p-5 text-center text-lg-left">
                            <h1>Abhishek Chatterjee</h1>
                            <p>
                                @imdeepmind 
                                {" "}
                                <Link to="/edit"><i className="fas fa-user-edit"></i></Link>
                                {" "}    
                                <Link to="/settings"><i className="fas fa-cog"></i></Link> <br />
                                <a href="mailto:infinityatme@gmail.com">infinityatme@gmail.com</a>
                            </p>
                            <p>
                                <span className="mr-4">12 Posts</span>
                                <span className="mr-4">106 Followers</span>
                                <span className="mr-4">23 Following</span>
                            </p>
                            <p className="">
                                Etiam sed sem neque. Vivamus non nunc quam. In ornare rutrum ante eget semper. Duis sit amet placerat velit, in euismod lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam molestie lacus tempus sem fringilla lobortis. Vivamus vel aliquam eros. In hac habitasse platea dictumst. Etiam ac fringilla mauris. Aenean at blandit ante. Suspendisse a libero vel sapien laoreet feugiat. Phasellus hendrerit fringilla finibus.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                    <i className="fas fa-images text-dark"></i>{" "}<span className="text-dark">Posts</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                    <i className="fas fa-user-friends text-dark"></i>{" "}<span className="text-dark">Followers</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
                                    <i className="fas fa-user-friends text-dark"></i>{" "}<span className="text-dark">Following</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Row>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <h4>Tab 1 Contents</h4>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <h4>Tab 2 Contents</h4>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <h4>Tab 3 Contents</h4>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Container>
            </Fragment>
        )
    }
}

export default Profile;