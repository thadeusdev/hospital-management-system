import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';


const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            password_confirmation,
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => console.log(user));
            setIsSignupSuccess(true);
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

      if (isSignupSuccess) {
        return <Navigate to="/Login" replace={true} />;
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

                    Signup</Typography>
                < TextField margin="normal"
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    type={"text"}
                    variant='outlined'
                    placeholder='Username' />

                <TextField margin="normal"
                    label="Password"
                    type={"password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    variant='outlined'
                    placeholder='Password' />

                <TextField margin="normal"
                    label="Confirm Password"
                    value={password_confirmation}
                    onChange={(event) => setPassword_confirmation(event.target.value)}
                    type={"password"} variant='outlined'
                    placeholder='confirm password' />
                <br />
                <p>{errors}</p>

                <Button type="submit" sx={{ marginTop: 3, borderRadius: 3 }} variant="contained" color='warning'>{isLoading ? "Loading..." : "Signup"}</Button>
                <Button
                    onClick={() => setIsSignupSuccess(!isSignupSuccess)}
                    sx={{ marginTop: 3, borderRadius: 3 }} >
                    Change To {isSignupSuccess ? "Signup" : "Login"}
                </Button>

            </Box>

        </form>
    );
};

export default Signup