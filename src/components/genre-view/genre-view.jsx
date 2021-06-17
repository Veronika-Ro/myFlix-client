import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
            <Card className="GenreView">
                <Card.Body>
                    <Card.Title className="genre-name">
                        <span className="value">{genre.Name}</span>
                    </Card.Title>
                    <Card.Text className="genre-description">
                        <span className="value">{genre.Description}</span>
                    </Card.Text>
                </Card.Body>
                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>

            </Card>
        );
    }
}