import React, { Fragment } from 'react';
import {
    Card, CardBody, NavLink
} from 'reactstrap';

const QuickActions = props => {
    return (
        <Fragment>
            <div className="d-flex text-center w-100">
                <Card className="w-25">
                    <CardBody>
                        <NavLink href="#"><h1><i className="fas fa-home"></i></h1></NavLink>
                    </CardBody>
                </Card>
                <Card  className="w-25">
                    <CardBody>
                        <NavLink href="#"><h1><i className="fas fa-user-alt"></i></h1></NavLink>
                    </CardBody>
                </Card>
                <Card className="w-25">
                    <CardBody>
                        <NavLink href="#"><h1><i className="fas fa-users"></i></h1></NavLink>
                    </CardBody>
                </Card>
                <Card className="w-25">
                    <CardBody>
                        <NavLink href="#"><h1><i className="fas fa-comments"></i></h1></NavLink>
                    </CardBody>
                </Card>
            </div>
            <div className="d-flex text-center w-100">
                <Card className="w-25">
                    <CardBody>
                        <NavLink href="#"><h1><i className="fas fa-cog"></i></h1></NavLink>
                    </CardBody>
                </Card>
                <Card  className="w-25">
                    <CardBody>
                        <NavLink href="#"><h1><i className="fas fa-info"></i></h1></NavLink>
                    </CardBody>
                </Card>
                <Card className="w-25">
                    <CardBody>
                        <NavLink href="#"><h1><i className="fas fa-envelope"></i></h1></NavLink>
                    </CardBody>
                </Card>
                <Card className="w-25">
                    <CardBody>
                        <NavLink href="#"><h1><i className="fas fa-sign-out-alt"></i></h1></NavLink>
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    )
}

export default QuickActions;