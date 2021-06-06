import React from 'react';
<<<<<<< Updated upstream
=======
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
>>>>>>> Stashed changes

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

<<<<<<< Updated upstream
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
=======
        return (
            <CardDeck>
                <Card border="dark">
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                    </Card.Body>
                </Card>
            </CardDeck>
        );
>>>>>>> Stashed changes
    }
}

//Also check this