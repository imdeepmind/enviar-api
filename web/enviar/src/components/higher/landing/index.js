import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = props => {
    return (
        <Fragment>
            <div className="class-landing d-flex align-items-start justify-content-center flex-column bg-primary p-5">
                <h1 className="display-3 text-white">enviar</h1>
                <h2 className="text-light">a simple social network platform for sharing your photos</h2>
                <p className="text-light"><Link to="/login" className="text-light">login</Link> or <Link to="/register" className="text-light">register</Link></p>
            </div>
        </Fragment>
    )
}

export default Landing;