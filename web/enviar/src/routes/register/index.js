import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardTitle, Form, Input, Button } from 'reactstrap';

import Landing from '../../components/higher/landing';
import Footer from '../../components/higher/footer';

class Register extends Component{
    render(){
        return (
            <Fragment>
                <Landing type="register"/>
                <div className="w-100 d-flex justify-content-center align-items-center pt-5 pb-5">
                    <Card>
                        <CardBody>
                            <CardTitle className="text-center">
                                register
                            </CardTitle>
                            <Form>
                                <Input placeholder="name..." required />
                                <Input placeholder="username..." required />
                                <Input type="password" placeholder="password..." required />
                                <Input placeholder="country..." required />
                                <Input placeholder="gender..." required />
                                <Input type="date" placeholder="date of birth..." required />
                                <Button type="submit" color="primary" className="w-100">register</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default Register;