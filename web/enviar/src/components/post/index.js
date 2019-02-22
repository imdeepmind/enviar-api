import React from 'react';
import {
    Card, CardBody, CardImg, CardHeader, CardFooter 
} from 'reactstrap';

import postImage from './post_sample.jpg';


const Post = (props) => {
    return (
        <Card>
            <CardHeader>Abhishek Chatterjee</CardHeader>
            <CardImg top width="100%" src={postImage} alt="sample post" />
            <CardBody>
                
            </CardBody>
            <CardFooter className="d-flex">
                <i className="far fa-heart"></i> {" "}
                <i class="far fa-comment-dots"></i>
            </CardFooter>
        </Card>
    )
}

export default Post;