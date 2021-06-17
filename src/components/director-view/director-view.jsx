import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;

        return (
            <Card className="director-view">
                <Card.Body>

                    <Card.Title className="director-name">
                        <span className="value">{director.Name}</span>
                    </Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="director-bio">
                            <span className="label">Bio: </span>
                            <span className="value">{director.Bio}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="director-birth">
                            <span className="label">Birth: </span>
                            <span className="value">{director.Birth}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="director-death">
                            <span className="label">Death: </span>
                            <span className="value">{director.Death}</span>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card >

        );
    }
}