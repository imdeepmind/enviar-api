import React from 'react';

import Avatar from '../avatar';

const ProfileCard = props => {
    return (
        <div className="d-flex">
            <div className="d-flex justify-content-center align-items-center p-2 pl-3">
                <Avatar source="" title="Abhishek Chatterjee" />
            </div>{" "}
            <div className="p-0 d-flex justify-content-center align-items-start flex-column">
                Abhishek Chatterjee
                <br />
                <small>
                    23 July, 12:03AM
                </small>
            </div>
        </div>
    )
}

export default ProfileCard;