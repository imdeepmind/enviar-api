import React from 'react';
import sample from '../../../assets/img/account.jpg';

const Avatar = (props) => {
    const width = props.width ? props.width : "48px";
    return (
        <img className="class-avatar border border-primary" style={{width:width}} src={props.source === undefined || props.source === '' ? sample : props.source} alt={props.title} />
    )
}

export default Avatar;