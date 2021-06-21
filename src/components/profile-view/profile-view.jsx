import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, FormControl, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

import axios from 'axios';
import { Link } from "react-router-dom";

import '../../index.scss';
import './profile-view.scss';

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
            movies: []
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    getUser(token) {
        let url = 'https://veronikas-myflix-app.herokuapp.com/users/' +
            localStorage.getItem('user');
        axios
            .get(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    username: response.data.UserName,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                    favoriteMovies: response.data.FavoriteMovies
                });
            });
    }

    handleDelete() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios
            .delete(`https://veronikas-myflix-app.herokuapp.com/users${user}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                alert(user + " has been deleted.");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.pathname = "/";
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleUpdate(e) {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        console.log(this.state);
        let setisValid = this.formValidation();
        if (setisValid) {
            console.log(this.props.setProfile(this.state));
            axios
                .put(`https://veronikas-myflix-app.herokuapp.com/users${user}`,
                    {
                        UserName: this.state.UserName,
                        Password: this.state.Password,
                        Email: this.state.Email,
                        Birthday: this.state.Birthday
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((response) => {
                    const data = response.data;
                    localStorage.setItem("user", data.UserName);
                    console.log(data);
                    alert(user + " has been updated.");
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
    }

    removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = 'https://veronikas-myflix-app.herokuapp.com/users' + localStorage.getItem('user')
            + '/favorites/' + movie._id;
        axios
            .delete(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("Movie was removed");
                this.componentDidMount();
            });
    }

    formValidation() {
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

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { movies, user, onBackClick, passwordError, usernameError, emailError, birthDateError } = this.props;
        // const { UsernameError, PasswordError, EmailError, BirthDateError } = this.state;
        const favoriteMovieList = movies.filter((movie) => {
            return this.state.favoriteMovies.includes(movie._id);
        });

        return (
            <div className="userProfile" style={{ display: "flex" }}>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Form className="justify-content-md-center mb-30">
                            <h1 style={{ textAlign: "center" }}>{`${user}`}  Profile Details</h1>

                            <Form.Group controlId="formUsername">
                                <h4>Username:</h4>
                                <Form.Label>{this.state.username}</Form.Label>

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <h4>Email:</h4>
                                <Form.Label>{this.state.email}</Form.Label>
                            </Form.Group>

                            <Form.Group controlId="formBasicDate">
                                <h4>Date of Birth:</h4>
                                <Form.Label>{this.state.birthDate}</Form.Label>
                            </Form.Group>

                            <Link to={`${this.state.UserName}/update`}>
                                <Button className="mb-2" variant="dark"
                                    type="link"
                                    size="md"
                                >
                                    Edit
                                </Button>
                            </Link>

                            <Button className="mb-2" variant="danger"
                                size="md"
                                onClick={() => this.handleDelete()} >
                                Delete Account
                            </Button>
                            <Button variant="dark" onClick={() => { onBackClick() }}>Back</Button>
                        </Form>
                    </Col>

                    <Col>
                        <h5>Favorite Movies: </h5>
                        {favoriteMovieList.map((movie) => {

                            if (favoriteMovieList.length === 0) {
                                <p>You have no favorites yet.</p>
                            }

                            return (
                                <div>
                                    <Card>
                                        <Card.Img variant="top" src={movie.ImageUrl} />
                                        <Card.Body>
                                            <Link to={`/movies/${movie._id}`}>
                                                <Card.Title>{movie.Title}</Card.Title>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                    <div>
                                        <Button variant="dark" onClick={() => this.removeFavorite(movie)}>
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}

                    </Col>

                </Row>

            </div>
        )
    }
}

ProfileView.propTypes = {
    movies: PropTypes.array.isRequired
};