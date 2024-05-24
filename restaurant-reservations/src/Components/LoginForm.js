import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
    const [formData, setFormData] = useState({
        userIdentifier: '', // Puede ser username o email
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', formData)
            .then(response => {
                onLogin();
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userIdentifier"
                    placeholder="Username or Email"
                    value={formData.userIdentifier}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
