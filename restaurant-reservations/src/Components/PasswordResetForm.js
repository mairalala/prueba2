import React, { useState } from 'react';
import axios from 'axios';

function PasswordResetForm() {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetError, setResetError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/password-reset', formData)
            .then(response => {
                setResetSuccess(true);
                setResetError('');
            })
            .catch(error => {
                setResetError('Password reset failed. Please try again.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Password Reset</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <button type="submit">Reset Password</button>
            {resetSuccess && <p className="success">Password reset instructions sent to your email.</p>}
            {resetError && <p className="error">{resetError}</p>}
        </form>
    );
}

export default PasswordResetForm;
