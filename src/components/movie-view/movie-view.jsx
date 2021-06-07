import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

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
                            <span className="value">{movie.Director.Name}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="movie-genre">
                            <span className="label">Genre: </span>
                            <span className="value">{movie.Genre.Name}</span>
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>

                </div>

            </Card >
        );
    }
}