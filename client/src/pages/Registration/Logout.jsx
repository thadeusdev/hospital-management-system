import React from 'react'
import { Navigate } from 'react-router-dom';
import { Button } from '@mui/material';


const Logout = () => {
    const handleLogout = () => {
        // Remove the authentication token from local storage
        localStorage.removeItem('authToken');
    };

  return (
        <Button onClick={handleLogout}>
            Log Out
        </Button>
    );
};
export default Logout