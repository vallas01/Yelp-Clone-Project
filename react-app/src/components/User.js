import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserPage.css'

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>

      <h2 className='user-detail-header' style={{color:'tomato'}}>User Details</h2>

    <div className='user-details'>
      <div className='info'>
        <h4>Name: {user.username}</h4>
        <h4>Address: {user.address}</h4>
        <h4>City: {user.city}</h4>
        <h4>State: {user.state}</h4>
        <h4>Zip: {user.zip}</h4>
      </div>

      <div className='user-avatar'>
        <img src={user.avatar}/>
      </div>
    </div>
    </>
  );
}
export default User;
