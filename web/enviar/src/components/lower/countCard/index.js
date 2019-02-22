import React from 'react';
import {
    Card, CardBody, CardTitle
} from 'reactstrap';

const CountCard = props => {
    return (
        <Card className="w-50">
            <CardBody>
                <CardTitle className="text-capitalize">{props.title}</CardTitle>
                <h1>{props.value}</h1>
            </CardBody>
        </Card>
    )
}

export default CountCard;