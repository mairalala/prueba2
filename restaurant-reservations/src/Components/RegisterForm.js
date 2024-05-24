import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onRegister, onCancel }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/register', formData)
            .then(response => {
                setMessage(response.data.message);
                console.log(response.data.message); // Mensaje de éxito en la consola
                setTimeout(() => {
                    onRegister();
                }, 2000);
            })
            .catch(error => {
                console.error('There was an error registering the user!', error);
                setMessage('Error registering user');
            });
    };
    

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
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
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={onCancel}>Cancel</button>
            
        </div>
    );
}

export default RegisterForm;
