import React, { useState } from 'react';

export function LoginView(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication then call props.onLoggedIn(username)
        props.onLoggedIn(username);
        /*this isn't a robust login procedure—it’s just enough for you to view and test your different views until you’ve set up a proper login authentication procedure.*/
    };

    return (
        <form>
            <label>
                UserName:
        <input type="text" value={username} onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
                Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}