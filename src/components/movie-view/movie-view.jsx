import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

    addFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = "https://veronikas-myflix-app.herokuapp.com/users/" + localStorage.getItem('user') +
            "/Movies/" + movie._id;
        var config = {
            method: 'post',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
        };
        console.log(token);
        axios(config)

            .then(function (response) {
                console.log(JSON.stringify(response.data));
                alert("Added to favorites!")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = "https://veronikas-myflix-app.herokuapp.com/users/" + localStorage.getItem('user') +
            "/Movies/remove/" + movie._id;

        axios
            .post(url, "", {
                headers: { Authorization: `Bearer ${user.token}` }
            })
            .then((response) => {
                console.log(response);
                alert("Removed from favorites.")
            })
            .catch(err => {
                console.log(err.response);
            });
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

                    <Button className="add mt-3 mr-2 w-50" onClick={() => this.addFavorite(movie)}> Add to Favorites</Button>

                </Card.Body>

                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>


            </Card >

        );
    }
}