import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function RegistrationView(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegister(username);

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

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter your Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicDateOfBirth">
                        <Form.Label>Date of birth:</Form.Label>
                        <Form.Control type="birthdate" placeholder="Enter your Date of Birth" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </Col>
        </Row>
    );
}

RegistrationView.propTypes = {
    onRegister: PropTypes.func.isRequired
};
