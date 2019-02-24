import React from 'react';

import { Link } from 'react-router-dom';

import Avatar from '../avatar';

const ProfileCard = props => {
    return (
        <div className="d-flex">
            <div className="d-flex justify-content-center align-items-center p-2 pl-3">
                <Avatar source={props.avatar} title={props.name} />
            </div>{" "}
            <div className="p-0 d-flex justify-content-center align-items-start flex-column">
                <Link to={`/profile/${props.name}`}>{props.name}</Link>
                <small>
                   {props.text}
                </small>
            </div>
        </div>
    )
}

export default ProfileCard;