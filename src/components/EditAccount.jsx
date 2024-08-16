import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

function EditAccountPage() {

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 2, marginBottom: 2, borderRadius: 2 }}>
                <Typography variant='h1' component='h1' align='center' gutterBottom>
                    Not yet...
                </Typography>
                <Typography variant='h5' align='center' gutterBottom>
                    Feature coming soon.
                </Typography>
            </Paper>
        </Container>
    );
}

export default EditAccountPage;