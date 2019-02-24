import React, { Fragment } from 'react';
import {
    Card, CardBody
} from 'reactstrap';

import ProfileCard from '../../lower/profileCard';
import CountCard from '../../lower/countCard';
import QuickActions from '../../lower/quickActions';


const AdditionalInfo = (props) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <ProfileCard 
                        name={props.name} 
                        avatar={props.avatar} 
                        text={props.text} />
                </CardBody>
            </Card>
            <div className="d-flex w-100 text-center mb-3">
                <CountCard title="Followers" value={props.followers} />
                <CountCard title="Following" value={props.following} />
            </div>
            <QuickActions />
        </div>
    )
}

export default AdditionalInfo;