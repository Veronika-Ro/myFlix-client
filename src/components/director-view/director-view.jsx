import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

    render() {
        const { director } = this.props;

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

                <Route path="/directors/:name" render={({ match, history }) => {
                    if (movies.length === 0) return <div className="main-view" />;
                    return <Col md={8}>
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                    </Col>
                }
                } />


            </Card >

        );
    }
}