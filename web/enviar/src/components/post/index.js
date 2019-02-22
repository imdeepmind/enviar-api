import React from 'react';
import {
    Card, CardBody, CardImg, CardHeader, CardFooter, CardTitle
} from 'reactstrap';
import Avatar from '../avatar';

import postImage from './post_sample.jpg';


const Post = (props) => {
    return (
        <Card>
            <CardHeader className="d-flex p-0">
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