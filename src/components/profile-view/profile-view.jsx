import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, FormControl, Card } from 'react-bootstrap';

import { setUser } from '../../actions/actions';

import { connect } from 'react-redux';

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



    handleDelete() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios
            .delete(`https://veronikas-myflix-app.herokuapp.com/users/${user}`,
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

    removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = 'https://veronikas-myflix-app.herokuapp.com/users/' + localStorage.getItem('user')
            + '/Movies/remove/' + movie._id;

        axios
            .delete(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("Movie was removed");
                this.componentDidMount();
            });
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { movies, user, onBackClick } = this.props;
        const favoriteMovieList = movies.filter((movie) => {
            return this.state.favoriteMovies.includes(movie._id);
        });

        return (
            <div className="userProfile" style={{ display: "flex" }}>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Form className="justify-content-md-center">
                            <h1 style={{ textAlign: "center" }}>Profile Details</h1>

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
                                <Form.Label>{this.state.birthday}</Form.Label>
                            </Form.Group>

                            <Link to={`${this.state.username}/update`}>
                                <Button className="mb-2" variant="outline-dark"
                                    type="link"
                                    size="md">
                                    Edit
                                </Button>
                            </Link>

                            <Button className="mb-2" variant="outline-danger"
                                size="md" className="float-right"
                                onClick={() => this.handleDelete()} >
                                Delete Account
                            </Button>
                        </Form>
                        <Button variant="outline-dark" block onClick={() => { onBackClick() }}>Back</Button>
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

let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setUser })(ProfileView);