import React, { Fragment } from 'react';
import {
    Card, CardBody, CardTitle, Row, Col
} from 'reactstrap';

import ProfileCard from '../../lower/profileCard';
import CountCard from '../../lower/countCard';
import QuickActions from '../../lower/quickActions';


const AdditionalInfo = (props) => {
    return (
        <Fragment>
            <Card>
                <CardBody>
                    <ProfileCard />
                </CardBody>
            </Card>
            <div className="d-flex w-100 text-center mb-3">
                <CountCard title="Followers" value="3216" />
                <CountCard title="Following" value="321" />
            </div>
            <QuickActions />
        </Fragment>
    )
}

export default AdditionalInfo;