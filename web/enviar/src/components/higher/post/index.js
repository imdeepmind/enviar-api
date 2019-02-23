import React from 'react';
import {
    Card, CardBody, CardImg, CardHeader, CardFooter, CardTitle
} from 'reactstrap';

import postImage from './post_sample.jpg';

import ProfileCard from '../../lower/profileCard';


const Post = (props) => {
    return (
        <Card className="mb-3"> 
            <div className="p-2">
                <ProfileCard />
            </div>
            <CardImg top width="100%" src={postImage} alt="sample post" />
            <CardBody>
                <CardTitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non iaculis odio. Donec dignissim nulla velit, vel iaculis erat vestibulum vel. Aenean pellentesque purus nec posuere posuere.</CardTitle>
            </CardBody>
            <div className="d-flex justify-content-between align-items-center pl-3 pr-3 pb-2 pt-2 border-top" style={{fontSize:"1.2em"}}>
                <div>
                    <i className="far fa-heart"></i> <span>514 likes</span> 
                </div>
                <div>
                    <i class="far fa-comment-dots float-right"></i>
                </div>
            </div>
        </Card>
    )
}

export default Post;