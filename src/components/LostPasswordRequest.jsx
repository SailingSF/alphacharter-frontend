import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import AttentionSection from './AttentionSection';

function LostPasswordRequest() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handlePasswordReset = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://financeassistant-01-7c9325856268.herokuapp.com/api/password_reset/', {
                email
            });
            console.log(response.data);
            // TODO handle this better than string matching, improve api response
            if (response.data.detail === "Password reset e-mail has been sent.") {
                setSuccessMessage("Password reset email sent!");
                setError('');
            } else {
                setError(response.data.email[0]);
                setSuccessMessage('');
            }

        } catch (err) {
            setError(err.response?.data?.error || "A user with this email doesn't exist, make a free account!");
            setSuccessMessage('');
        }
    };

    const warningComponent = { title: "Attention:", text: "You're a dumbass. Use this to request a password reset email if you've forgetten your password, dumbass." };

    return (
        <Container maxWidth="sm" sx={{ marginBottom: '4rem' }}>
            <AttentionSection title={warningComponent.title} text={warningComponent.text}></AttentionSection>
            <Typography variant="h4" component="h1" gutterBottom>
                Password Reset
            </Typography>
            <form onSubmit={handlePasswordReset}>
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Send Email
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                {successMessage && <Typography color="primary">{successMessage}</Typography>}
            </form>
            <Typography variant='h5' component='h4' gutterBottom>
                <br></br>Don't have an account?
            </Typography>
            <Button variant='contained' color='primary' href='/signup' fullWidth>Sign Up</Button>
        </Container>
    );
}

export default LostPasswordRequest;
