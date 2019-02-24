import React from 'react';
import sample from '../../../assets/img/account.jpg';

const Avatar = (props) => {
    return (
        <img className="class-avatar border border-primary" src={props.source === undefined || props.source === '' ? sample : props.source} alt={props.title} />
    )
}

export default Avatar;