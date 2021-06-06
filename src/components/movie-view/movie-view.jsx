import React from 'react';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                {/*Tried adding the director to moview view, but to be reviewed
                    <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.map(function (movie) { return movie.Director.Name; })}</span>
                     </div>*/}

                <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>

            </div>
        );
    }
}