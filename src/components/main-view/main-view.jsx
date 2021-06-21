import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../update-view/update-view';
// update view to be added
// import { UpdateView } from '../update-view/update-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class MainView extends React.Component {

    constructor() {
        //super enables you to inherit the parent class- or react component
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: null,
            userData: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://veronikas-myflix-app.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.UserName
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.UserName);
        this.getMovies(authData.token);
    }

    onRegister(registered) {
        this.setState({
            registered
        });
        window.open("/", "_self");
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        console.log("logout successful");
        window.open("/", "_self");
    }

    //all class components need render and return method to display info and functions need the return method
    render() {
        const { registered, user, movies, selectedMovie, userData } = this.state;

        return (
            <Router>

                <Row> <Col className="mb-5">    <Navbar bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">MyFlix</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to={`/users/${this.props.user}`}>My Profile</Nav.Link>
                    </Nav>
                    <Button variant="outline-light" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                </Navbar>
                </Col> </Row>

                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />
                    <Route path="/users/:username" render={({ history }) => {
                        if (!user) return <Col md={6}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />


                    <Route path="/users/:username/update" render={({ history }) => {
                        if (!user) return <Col md={6}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        return <Col md={8}>
                            <UpdateView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                </Row>
            </Router>
        );
    }

}


export default MainView;