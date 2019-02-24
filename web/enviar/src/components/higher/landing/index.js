import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Landing = props => {
    console.log(props)
    return (
        <Fragment>
            <div className="class-landing d-flex align-items-start justify-content-center flex-column bg-primary p-5">
                <Row>
                    <Col xs="12" lg="6">
                        <h1 className="display-3 text-white">enviar</h1>
                        <h2 className="text-light">a simple social network platform for sharing your moments</h2>
                        <p className="text-light">
                            <Link to="/login" className={props.type === 'login' ? "text-underline text-light" : "text-light"}>login</Link>{" "}or{" "}
                            <Link to="/register" className={props.type === 'register' ? "text-underline text-light" : "text-light"}>register</Link>
                        </p>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

export default Landing;