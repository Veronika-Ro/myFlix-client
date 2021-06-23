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

    const [usernameError, setUserNmeError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        console.log(this.state);
        let setisValid = formValidation();
        if (setisValid) {

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

    const formValidation = () => {
        let UserNameError = {};
        let EmailError = {};
        let PasswordError = {};
        let BirthdayError = {};
        let isValid = true;

        if (this.state.UserName.length < 5) {
            UserNameError.usernameShort = "Must be alphanumeric and contain more than 5 characters";
            isValid = false;
        }
        if (this.state.Password.length < 3) {
            PasswordError.passwordMissing = "You must enter a current password, or new password must be longer than 3 characters.";
            isValid = false;
        }
        if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
            EmailError.emailNotEmail = "Must enter a valid email address.";
            isValid = false;
        }
        if (this.state.birthday === '') {
            BirthdayError.birthdayEmpty = "Please enter your birthday.";
            isValid = false;
        }
        this.setState({
            UserNameError: UserNameError,
            PasswordError: PasswordError,
            EmailError: EmailError,
            BirthdayError: BirthdayError,
        })
        return isValid;
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

