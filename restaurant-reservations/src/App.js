import React, { useState } from 'react';
import './App.css'; // Importa el archivo CSS
import LoginForm from './Components/LoginForm';
import ReservationForm from './Components/ReservationForm';
import RegisterForm from './Components/RegisterForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showReservation, setShowReservation] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowRegister(false);
    };

    const handleRegister = () => {
        setShowRegister(true);
    };

    const handleRegisterComplete = () => {
        setShowRegister(false);
    };

    const handleCancel = () => {
        setShowRegister(false);
    };

    const handleReservation = () => {
        setShowReservation(true);
    };

    return (
        <div className="App">
            {!isLoggedIn && !showRegister && (
                <>
                    <LoginForm onLogin={handleLogin} />
                    <p><a href="#" onClick={handleRegister}>Register</a></p>
                    <p><a href="#">Forgot Password</a></p>
                </>
            )}

            {!isLoggedIn && showRegister && (
                <RegisterForm onRegister={handleRegisterComplete} onCancel={handleCancel} />
            )}

            {isLoggedIn && !showReservation && (
                <>
                    <h1>Restaurant Reservation</h1>
                    <button onClick={handleReservation}>Make a Reservation</button>
                </>
            )}

            {isLoggedIn && showReservation && (
                <ReservationForm />
            )}
        </div>
    );
}

export default App;
