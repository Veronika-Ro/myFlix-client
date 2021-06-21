import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

    handleAdd() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios.post(`https://veronikas-myflix-app.herokuapp.com/users/${user}` +
            this.props.movie._id, {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                alert(this.props.movie.Title + " has been added to your favorites!");
            })
    }

    handleRemove() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios.post(`https://veronikas-myflix-app.herokuapp.com/users/${user}` +
            this.props.movie._id, {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                alert(this.props.movie.Title + " has been removed from your favorites!");
            })
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Card className="movie-view">
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="text-center movie-poster">
                            <img src={movie.ImagePath} />
                        </ListGroup.Item>
                    </ListGroup>

                    <Card.Title className="text-center movie-title">
                        <span className="value">{movie.Title}</span>
                    </Card.Title>

                    <ListGroup variant="flush">
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

                    <div className="favorite-buttons">
                        <Link to={`/movies/${movie.Title}`}>
                            <Button block type="button" variant="success" onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
                        </Link>
                    </div>
                    <div className="favorite-buttons">
                        <Link to={`/movies/${movie.Title}`}>
                            <Button block type="button" variant="danger" onClick={() => this.handleRemove(movie)}>Remove from favorites</Button>
                        </Link>
                    </div>
                </Card.Body>

                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>


            </Card >

        );
    }
}