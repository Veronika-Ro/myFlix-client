import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from "react-router-dom";

export class GenreView extends React.Component {

    render() {
        const { genre } = this.props;

        return (
            <Card>

                <div className="genre-view">
                    <ListGroup variant="flush">
                        <ListGroup.Item className="genre-name">
                            <span className="value">{movie.Genre.Name}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="genre-description">
                            <span className="value">{movie.Genre.Description}</span>
                        </ListGroup.Item>
                    </ListGroup>

                </div>

                <Route path="/genre/:name" render={({ match, history }) => {
                    if (movies.length === 0) return <div className="main-view" />;
                    return <Col md={8}>
                        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                    </Col>
                }
                } />


            </Card >

        );
    }
}