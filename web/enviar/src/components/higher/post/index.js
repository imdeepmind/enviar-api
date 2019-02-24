import React from 'react';
import {
    Card, CardBody, CardImg, CardTitle
} from 'reactstrap';

import ProfileCard from '../../lower/profileCard';


const Post = (props) => {
    return (
        <Card className="mb-4"> 
            <div className="p-2">
                <ProfileCard name={props.name} avatar={props.avatar} text={props.text}/>
            </div>
            <CardImg top width="100%" src={props.image} alt={props.title} />
            <CardBody>
                <CardTitle>{props.title}</CardTitle>
            </CardBody>
            <div className="d-flex justify-content-between align-items-center pl-3 pr-3 pb-2 pt-2 border-top" style={{fontSize:"1.2em"}}>
                <div>
                    <i className="far fa-heart class-cursor-pointer" onClick={props.likeMethod}></i> <span>{props.likes} likes</span> 
                </div>
                <div>
                    <i class="far fa-comment-dots float-right class-cursor-pointer" onClick={props.commentMethod}></i>
                </div>
            </div>
        </Card>
    )
}

export default Post;