import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { updateUser } from '../../actions/actions';

import { connect } from 'react-redux';


export function UpdateView(props) {
    const [username, setUserName] = useState(''); //props.user.UserName if we want to use Redux
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        console.log("User details have been updated");

        {

            axios
                .put(`https://veronikas-myflix-app.herokuapp.com/users/${user}`,
                    {
                        UserName: username,
                        Password: password,
                        Email: email,
                        Birthday: birthday
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((response) => {
                    //do we need this code?
                    // this.props.setMovies(response.data);
                    const data = response.data;
                    localStorage.setItem("user", data.UserName);
                    console.log(data);
                    alert(user + " has been updated.");
                    console.log(response);
                    window.open('/users/:UserName', '_self');
                })
                .catch(e => {
                    console.log('error updating the user')
                    console.log(error.response.data);
                });
        }
    }

    /*Form validation to be added*/

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

let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { updateUser })(UpdateView);