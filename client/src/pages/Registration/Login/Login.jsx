import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(isLoggedIn)
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Validate the form fields (e.g. make sure the email is in the correct format)

            // Make an HTTP request to your server to create a new user account with the provided information
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();

            // If the signup is successful, store the authentication token and set isSignupSuccess to true
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                setIsLoggedIn(true);
            } else {
                setError('Invalid login credentials');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    if (isLoggedIn) {
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
                    {isLoggedIn ? "Signup" : "Login"}
                </Typography>
                < TextField margin="normal"
                    type={"text"}
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    variant='outlined'
                    placeholder='Username' />



                <TextField margin="normal"
                    type={"password"}
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    variant='outlined'
                    placeholder='password' />

                <Button type="submit" sx={{ marginTop: 3, borderRadius: 3 }} variant="contained" color='warning'>Login</Button>
                <Button
                    onClick={() => setIsLoggedIn(!isLoggedIn)}
                    sx={{ marginTop: 3, borderRadius: 3 }} >
                    Don't have an account?  {isLoggedIn ? "Login" : "Signup"}
                </Button>

            </Box>


        </form>
    );
};

export default Login