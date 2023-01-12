import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => console.log(user));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }

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

                <Button type="submit" sx={{ marginTop: 3, borderRadius: 3 }} variant="contained" color='warning'>
                    {isLoading ? "Loading..." : "Login"}
                </Button>
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