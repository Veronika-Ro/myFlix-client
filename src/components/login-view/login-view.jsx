import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication then call props.onLoggedIn(username)
        props.onLoggedIn(username);
        /*this isn't a robust login procedure—it’s just enough for you to view and test your different views until you’ve set up a proper login authentication procedure.*/
    };

    return (
        <Row className="justify-content-md-center">
            <Col xs lg="6">
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Username" value={username} onChange={e => setUserName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter your Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </Col>
        </Row>
    );
}