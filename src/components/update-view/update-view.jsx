import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function UpdateView(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        axios.put('https://veronikas-myflix-app.herokuapp.com/users/:UserName', {
            "UserName": username,
            "Password": password,
            "Email": email,
            "Birthday": birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/users/:username', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error updating the user details')
            });

    };

    return (
        <Row className="justify-content-md-center">
            <Col xs lg="6">
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Update your Username" value={username} onChange={e => setUserName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Update your Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Update your Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicDateOfBirth">
                        <Form.Label>Date of birth:</Form.Label>
                        <Form.Control type="birthday" placeholder="Update your Date of Birth" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </Col>
        </Row>
    );
}

