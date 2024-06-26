import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import AttentionSection from './AttentionSection';
import axios from 'axios';

function RegisterForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('https://financeassistant-01-7c9325856268.herokuapp.com/api/register/', formData)
            console.log('User registered:', response.data);
            setSuccess('Now Login!');
            setFormData({
                first_name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setError('');
            navigate('/login')

        } catch(error) {
            console.log('Error:', error.response.data);
            let errorMessage = 'Registration failed. Please check your details and try again.';
            if (error.response && error.response.data && error.response.data.error) {
                const errors = error.response.data.error;
                errorMessage = Object.keys(errors)
                    .map(field => `${field}: ${errors[field].join(', ')}`)
                    .join('\n');
            }
            setError(errorMessage);
            setSuccess(false);
        }
    };

    const warningComponent = { title: "Attention:", text: "Signing up now does not grant usage access to the AlphaCharter AI chat and other features at the moment. However, signing up now does put you first in line for when features become publicly available, and makes you eligible for free usage, access to beta the beta, and other features."}

    return (
        <Container component="main" maxWidth="sm" sx={{ marginBottom: '4rem' }}>
            <AttentionSection title={warningComponent.title} text={warningComponent.text}></AttentionSection>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            {success ? (
                <Alert severity="success">Registration successful!</Alert>
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        name="first_name"
                        autoComplete="name"
                        autoFocus
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
            )}
            {error && <Alert severity="error">{error}</Alert>}    
        </Container>
    );
}

export default RegisterForm;
