import React, { useState } from 'react';
import axios from 'axios';

function ReservationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 1
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/reservations', formData)
            .then(response => {
                setSuccessMessage(`Reservation made with ID: ${response.data.id}`);
                setErrorMessage('');
                setShowConfirmation(true);
            })
            .catch(error => {
                setSuccessMessage('');
                setErrorMessage('There was an error making the reservation. Please try again.');
                setShowConfirmation(false);
            });
    };

    return (
        <div>
            <h2>Make a Reservation</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
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
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    required
                />
                <button type="submit">Reserve</button>
            </form>

            {showConfirmation && (
                <div className="confirmation">
                    <h3>Reservation Details</h3>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Date:</strong> {formData.date}</p>
                    <p><strong>Time:</strong> {formData.time}</p>
                    <p><strong>Guests:</strong> {formData.guests}</p>
                    <p>{successMessage}</p>
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    );
}

export default ReservationForm;
