# myFlix-client
## Objective
Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database). Server side project here- https://github.com/Veronika-Ro/myFlix-project
## The 5 W’s
1. Who—The users of your myFlix application. They will be movie enthusiasts who enjoy
reading information about different movies.
1. What—A single-page, responsive application with routing, rich interactions, several
interface views, and a polished user experience. The client-side developed in this
Achievement will support the existing server-side from Achievement 2 by facilitating user
requests and rendering the response from the server-side via a number of different
interface views.
1. When—myFlix users will be able to use it whenever they want to read information about
different movies or update their user information—for instance, their list of “Favorite
Movies.”
1. Where—The application will be hosted online. The myFlix application itself is responsive
and can therefore be used anywhere and on any device, giving all users the same
experience.
1. Why—Movie enthusiasts like to be able to access information about different movies,
directors, and genres, whenever they want to. Having the ability to save lists of favorite
movies will ensure users always have access to the films they want to watch or
recommend to their peers.
## User Stories
* As a user, I want to be able to access information on movies, directors, and genres so
that I can learn more about movies I’ve watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite
movies.
## Essential Views and Features
### Main view
* Returns a list of ALL movies to the user (each listed item with an image, title, and
description)
* Sorting and filtering
* Ability to select a movie for more details
### Single movie view
* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add a movie to their list of favorites
### Login view
* Allows users to log in with a username and password
Registration view
* Allows new users to register (username, password, email, birthday)
### Genre view
* Returns data about a genre, with a name and description
* Displays example movies
### Director view
* Returns data about a director (name, bio, birth year, death year)
* Displays example movies
### Profile view
* Allows users to update their user info (username, password, email, date of birth)
* Allows existing users to deregister
* Displays favorite movies
* Allows users to remove a movie from their list of favorites
## Technical Requirements
* The application must be a single-page application (SPA)
* The application must use state routing to navigate between views and share URLs
* The application must give users the option to filter movies
* The application must give users the option to sort movies
* The application must initially use Parcel as its build tool
* The application must be written using the React library and in ES2015+
* The application must be written with React Redux (hence respecting the Flux pattern)
* The application must use Bootstrap as a UI library for styling and responsiveness
* The application must contain a mix of class components and function components
* The application may be hosted online
