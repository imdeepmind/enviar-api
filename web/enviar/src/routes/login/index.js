import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardTitle, Form, Input, Button } from 'reactstrap';

import Landing from '../../components/higher/landing';
import Footer from '../../components/higher/footer';

class Login extends Component{
    render(){
        return (
            <Fragment>
                <Landing type="login"/>
                <div className="w-100 d-flex justify-content-center align-items-center pt-5 pb-5">
                    <Card>
                        <CardBody>
                            <CardTitle className="text-center">
                                login
                            </CardTitle>
                            <Form>
                                <Input placeholder="username..." required />
                                <Input type="password" placeholder="password..." required />
                                <Button type="submit" color="primary" className="w-100">login</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default Login;