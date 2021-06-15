import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Card>

                <div className="director-view">
                    <ListGroup variant="flush">
                        <ListGroup.Item className="director-name">
                            <span className="value">{movie.Director.Name}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="director-bio">
                            <span className="label">Bio: </span>
                            <span className="value">{movie.Director.Bio}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="director-birth">
                            <span className="label">Birth: </span>
                            <span className="value">{movie.Director.Birth}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="director-death">
                            <span className="label">Death: </span>
                            <span className="value">{movie.Director.Death}</span>
                        </ListGroup.Item>
                    </ListGroup>

                </div>

                <button onClick={() => { onBackClick(null); }}>Back</button>
            </Card >

        );
    }
}