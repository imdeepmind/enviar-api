import React from 'react';
import sample from './account.png';

const Avatar = (props) => {
    return (
        <img className="class-avatar" src={props.source === undefined || props.source === '' ? sample : props.source} alt={props.title} />
    )
}

export default Avatar;