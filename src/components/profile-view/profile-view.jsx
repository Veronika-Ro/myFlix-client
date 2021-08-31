import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, Image, Card } from 'react-bootstrap';

import { setUser } from '../../actions/actions';

import { connect } from 'react-redux';

import axios from 'axios';
import { Link } from "react-router-dom";

import '../../index.scss';
import './profile-view.scss';

export class ProfileView extends React.Component {


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
            })
            .catch(function (error) {
                console.log(error);
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
        const favoriteMovieList = this.props.movies.filter(movie => this.props.user.FavoriteMovies.includes(movie._id));

        return (
            <div className="userProfile" style={{ display: "flex" }}>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Form className="justify-content-md-center">
                            <h1 style={{ textAlign: "center" }}>Profile Details</h1>

                            <Form.Group controlId="formUsername">
                                <h4>Username:</h4>
                                <Form.Label>{this.props.user.UserName}</Form.Label>

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <h4>Email:</h4>
                                <Form.Label>{this.props.user.Email}</Form.Label>
                            </Form.Group>

                            <Form.Group controlId="formBasicDate">
                                <h4>Date of Birth:</h4>
                                <Form.Label>{this.props.user.Birthday}</Form.Label>
                            </Form.Group>

                            <Link to={`${this.props.user.UserName}/update`}>
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

                    <Col style={{ margin: '2em' }}>
                        <h2 style={{ textAlign: "center" }}>Favorite Movies: </h2>
                        {favoriteMovieList.map((movie) => {

                            if (favoriteMovieList.length === 0) {
                                <p>Search for movies and add to favorites to have your personal list of favorite movies here!</p>
                            }

                            return (
                                <div>
                                    <Row xs ClassName="border">
                                        <Col sm={4}>
                                            <Image
                                                width="40%" height="95%" src={movie.ImagePath} thumbnail />
                                        </Col>
                                        <Col sm={6}>
                                            <Link to={`/movies/${movie._id}`}>
                                                <Card.Title>{movie.Title}</Card.Title>
                                            </Link>
                                        </Col>
                                        <Col sm={2}>
                                            <Button variant="dark" onClick={() => this.removeFavorite(movie)}>
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
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

