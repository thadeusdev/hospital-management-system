import React, { useEffect, useState } from 'react'
import './User.css'
import { Link, useParams } from 'react-router-dom';

const User = () => {
  const [loggedInUser, setLoggedInUser] = useState({username: '', role: '', image: '', password: ''});
  const {id} = useParams()
  // console.log(id)

  useEffect(() => {
    fetch(`/users/${id}`)
    .then(res => res.json())
    .then(loggedInUser => setLoggedInUser(loggedInUser))
  }, []);

  if (!loggedInUser){
    return null;
  }

  const handleEdit = (e) => {
    setLoggedInUser({...loggedInUser, [e.target.name] : e.target.value})
  }

  function handleUserUpdate(e){        
    e.preventDefault();
    fetch(`/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            image: e.target.image.value,
            username: e.target.username.value,
            role: e.target.role.value,
            password: e.target.password.value,
        }),
    })
    .then((r) => r.json())
    .then((data) => {
        console.log(data)
    })
  }

  return (
    <div className='user'>
        <div className="patientTitleContainer">
          <h1 className="patientTitle">Welcome {loggedInUser.username}</h1> 
        </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={loggedInUser.image} alt="" />
          </div>
          <div className="userShowBottom">
            <h2>{loggedInUser.username}</h2>
            <p>{loggedInUser.role}</p>
          </div>
        </div>
        <div className="userUpdate">
        <span className="userUpdateTitle">Edit</span>
        <form onSubmit={handleUserUpdate} className="userUpdateForm">
          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Full Name:</label>
              <input type="text" className='userUpdateInput' name="username" value={loggedInUser.username} onChange={(e) => handleEdit(e)} />
            </div>
            <div className="userUpdateItem">
              <label>Role:</label>
              <input type="text" className='userUpdateInput' name="role" value={loggedInUser.role} onChange={(e) => handleEdit(e)} />
            </div>
            <div className="userUpdateItem">
              <label>Image:</label>
              <input type="text" className='userUpdateInput' name="image" value={loggedInUser.image} onChange={(e) => handleEdit(e)} />
            </div>
            <div className="userUpdateItem">
              <label>Password:</label>
              <input type="text" className='userUpdateInput' name="password" value={loggedInUser.password} onChange={(e) => handleEdit(e)} />
            </div>
          </div>
          <div className="userUpdateRight">
            <div className="userUpdateUpload">
              <img className="userUpdateImg" src={loggedInUser.image} alt="" />
            </div>
            <button className="userUpdateButton">Update</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default User