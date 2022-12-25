import React from 'react'
import { Link } from 'react-router-dom'

function AddPatientForm() {
  return (
    <div>
        <form className='form'>            
            <h1 className='title'>Add new patient</h1>
            <div className='form-inputs'>
                <label className='form-inputs'>First Name</label>
                <input 
                    className='form-input'
                    type="text"
                    name='first name'
                    placeholder='Enter first name' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Last Name</label>
                <input 
                    className='form-input'
                    type="text"
                    name='last name'
                    placeholder='Enter last name' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>City</label>
                <input 
                    className='form-input'
                    type="text"
                    name='city'
                    placeholder='Enter city' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Address</label>
                <input 
                    className='form-input'
                    type="text"
                    name='address'
                    placeholder='Enter address' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Username</label>
                <input 
                    className='form-input'
                    type="text"
                    name='username'
                    placeholder='Enter username' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Password</label>
                <input 
                    className='form-input'
                    type="text"
                    name='password'
                    placeholder='Enter password' 
                />
            </div>            
            <button className='form-input-btn' type='submit'>
                Add Patient
            </button>
            <Link to="/patients">
                <button className='form-back-btn'>
                    Go Back
                </button>
            </Link>            
        </form>
    </div>
  )
}

export default AddPatientForm