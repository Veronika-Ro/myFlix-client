import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card style={{ height: "100%" }} border="dark">
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body className="text-center">
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">{movie.Title}</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

