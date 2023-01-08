import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { borderRadius } from '@mui/system';
import Signup from '../Signup/Signup';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    console.log(isSignupSuccess)
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Validate the form fields (e.g. make sure the email is in the correct format)

            // Make an HTTP request to your server to create a new user account with the provided information
            const response = await fetch('/api/Signup', {
                method: 'POST',
                body: JSON.stringify({ username, password, email }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();

            // If the signup is successful, store the authentication token and set isSignupSuccess to true
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                setIsSignupSuccess(true);
            } else {
                setError('An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    if (isSignupSuccess) {
        return <Navigate to="/Signup" replace={true} />;
    }

    return (
        <form onSubmit={handleSubmit}>

            <Box display="flex"
                flexDirection={"column"}
                maxWidth={400} alignItems="center"
                justifyContent={"center"}
                margin="auto"
                marginTop={5}
                padding={3}
                borderRadius={5}
                boxShadow={"5px 5px 10px #ccc"}
                sx={{
                    ":hover": {
                        boxShadow: "10px 20px #ccc",
                    },
                }}
            >
                <Typography variant="h2" padding={3} textAlign="center">
                   {isSignupSuccess?"Signup":"Login"}
                </Typography>
                {
                   isSignupSuccess && (< TextField margin="normal"
                        type={"text"}
                        value={username} onChange={(event) => setUsername(event.target.value)}
                        variant='outlined'
                        placeholder='Username' />
                )}
                
                <TextField margin="normal"
                    type={"email"}
                    variant='outlined'
                    placeholder='Email' />
                
                <TextField margin="normal"
                    type={"password"} variant='outlined'
                    value={password} onChange={(event) => setPassword(event.target.value)}
                    placeholder='password' />
                
                <Button sx={{ marginTop: 3, borderRadius: 3 }} variant="contained" color='warning'>Login</Button>
                <Button
                    onClick={() => setIsSignupSuccess(!isSignupSuccess)}
                    sx={{ marginTop: 3, borderRadius: 3 }} >
                   Change To {isSignupSuccess ? "Login" :"Signup" }
                </Button>

            </Box>
            

        </form>
    );
};

export default Login