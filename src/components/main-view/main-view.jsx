import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../update-view/update-view';

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
        axios.get(`https://veronikas-myflix-app.herokuapp.com/movies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state- new setMovies from 3.8
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setUser({
            user: authData.user.UserName
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.UserName);
        this.getMovies(authData.token);
    }

    onRegister(registered) {
        this.setUser({
            registered
        });
        window.open("/", "_self");
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUser(null);
        console.log("logout successful");
        window.open("/", "_self");
    }

    // all class components need render and return method to display info and functions need the return method
    render() {
        let { movies } = this.props;
        let { registered, user, selectedMovie, userData } = this.state;

        return (
            <Router>

                {user && <Row> <Col className="mb-5">
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">MyFlix</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to={`/users/${user}`}>My Profile</Nav.Link>
                        </Nav>
                        <Button variant="outline-light" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                    </Navbar>
                </Col> </Row>}

                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <MoviesList movies={movies} />;
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

                    <Route path="/users/:userId" render={({ history }) => {
                        if (!user) return <Col md={6}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <ProfileView
                                movies={movies}
                                getUser={(token) => this.getUser(token)}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />


                    <Route path="/users/:userId/update" render={({ history }) => {
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

let mapStateToProps = state => {
    return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);