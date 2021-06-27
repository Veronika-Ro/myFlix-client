export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET-FILTER';
export const SET_USER = 'SET-USER';
export const UPDATE_USER = 'UPDATE-USER';

export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setUser(value) {
    return { type: SET_USER, value };
}

export function updateUser(value) {
    return { type: UPDATE_USER, value };
}