import React from 'react';

import Avatar from '../avatar';

const ProfileCard = props => {
    return (
        <div className="d-flex">
            <div className="d-flex justify-content-center align-items-center p-2 pl-3">
                <Avatar source="" title="Abhishek Chatterjee" />
            </div>{" "}
            <div className="p-2">
                Abhishek Chatterjee
                <br />
                <small>
                    Cras id convallis urna. Vivamus congue, ligula in placerat commodo.
                </small>
            </div>
        </div>
    )
}

export default ProfileCard;