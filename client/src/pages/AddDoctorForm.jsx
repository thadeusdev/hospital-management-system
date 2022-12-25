import React from 'react'
import { Link } from 'react-router-dom'

function AddDoctorForm() {
  return (
    <div>
        <form className='form'>
            <h1 className='title'>Add new doctor</h1>
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
            <div className='form-inputs'>
                <label className='form-inputs'>Primary Practice</label>
                <input 
                    className='form-input'
                    type="text"
                    name='primary practice'
                    placeholder='Enter primary practice' 
                />
            </div>
            <div className='form-inputs'>
                <label className='form-inputs'>Secondary Practice</label>
                <input 
                    className='form-input'
                    type="text"
                    name='secondary practice'
                    placeholder='Enter secondary practice' 
                />
            </div>
            <button className='form-input-btn' type='submit'>
                Add Doctor
            </button>
            <Link to="/doctors">
                <button className='form-back-btn'>
                    Go Back
                </button>
            </Link>
        </form>
    </div>
  )
}

export default AddDoctorForm