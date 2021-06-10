import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

export function LoginView(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication then call props.onLoggedIn(username)
        axios.post('https://veronikas-myflix-app.herokuapp.com/login', {
            UserName: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };


    return (
        <div>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form style={{ margin: "20px" }}>
                        <Form.Group controlId="formBasicUserName">
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
            <Row className="justify-content-md-center">
                <Col className="text-center" xs lg="6">
                    <p>Do not have an account?</p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="text-center" xs lg="6">
                    {/*Link to registration view to be amended
                    <Link to={`/register/${RegistrationView}`}>
                        <Button variant="link"><span className="value">Register here!</span></Button>
                    </Link>*/}
                </Col>
            </Row>
        </div >
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}
