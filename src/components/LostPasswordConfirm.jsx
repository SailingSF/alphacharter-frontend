import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import AttentionSection from './AttentionSection';

function LostPasswordConfirm() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const { uidb64, token } = useParams();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handlePasswordResetConfirm = async (event) => {
        event.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('https://financeassistant-01-7c9325856268.herokuapp.com/api/password_reset/confirm/', {
                uidb64,
                token,
                new_password: formData.newPassword
            });
            if (response.data.detail === "Password has been reset successfully.") {
                setSuccessMessage(response.data.detail);
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
            setSuccessMessage('');
        }
    };

    const warningComponent = { title: "Attention:", text: "Set your new password." };

    return (
        <Container maxWidth="sm" sx={{ marginBottom: '4rem' }}>
            <AttentionSection title={warningComponent.title} text={warningComponent.text}></AttentionSection>
            <Typography variant="h4" component="h1" gutterBottom>
                Password Reset
            </Typography>
            <form onSubmit={handlePasswordResetConfirm}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    value={formData.newPassword}
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
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Reset Password
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

export default LostPasswordConfirm;