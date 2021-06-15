import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

    render() {
        const { movie } = this.props;

        return (
            <Card>

                <div className="movie-view">
                    <ListGroup variant="flush">
                        <ListGroup.Item className="text-center movie-poster">
                            <img src={movie.ImagePath} />
                        </ListGroup.Item>
                        <ListGroup.Item className="movie-title">
                            <span className="label">Title: </span>
                            <span className="value">{movie.Title}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="movie-director">
                            <span className="label">Director: </span>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button variant="link"><span className="value">{movie.Director.Name}</span></Button>
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item className="movie-genre">
                            <span className="label">Genre: </span>

                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant="link"><span className="value">{movie.Genre.Name}</span></Button>
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>

                </div>

                <button onClick={() => { onBackClick(null); }}>Back</button>


            </Card >

        );
    }
}