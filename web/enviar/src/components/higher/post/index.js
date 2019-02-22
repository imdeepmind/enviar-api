import React from 'react';
import {
    Card, CardBody, CardImg, CardHeader, CardFooter, CardTitle
} from 'reactstrap';

import postImage from './post_sample.jpg';

import ProfileCard from '../../lower/profileCard';


const Post = (props) => {
    return (
        <Card className="mb-3"> 
            <CardHeader className="p-0">
                <ProfileCard />
            </CardHeader>
            <CardImg top width="100%" src={postImage} alt="sample post" />
            <CardBody>
                <CardTitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non iaculis odio. Donec dignissim nulla velit, vel iaculis erat vestibulum vel. Aenean pellentesque purus nec posuere posuere.</CardTitle>
            </CardBody>
            <CardFooter className="d-inline lead pl-3 pt-2 pb-2">
                <i className="far fa-heart"></i> <span>514 likes</span> {" "}
                <i class="far fa-comment-dots float-right"></i>
            </CardFooter>
        </Card>
    )
}

export default Post;