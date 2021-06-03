import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegister(username);

    };

    return (
        <form>
            <label>
                Username:
        <input type="text" value={username} onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
                Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Date of birth:
        <input type="birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

RegistrationView.propTypes = {
    onRegister: PropTypes.func.isRequired
};
