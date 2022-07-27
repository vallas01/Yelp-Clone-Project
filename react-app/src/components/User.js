import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { getReviews } from "./../store/review"
import { getRestaurantsThunk } from "./../store/restaurant"
import './UserPage.css'

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const userReviews = Object.values(useSelector(state => state?.review)).filter(review => review.user_id == userId)
  const userRestaurants = Object.values(useSelector(state => state.restaurant)).filter(restaurant => restaurant.user_id == userId)
  console.log('COMPONENT HEREEEEEEEEEEEEEEE', userRestaurants)

  useEffect(() => {
    dispatch(getReviews())
    dispatch(getRestaurantsThunk())
  },[dispatch])

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

    <div className='user-reviews'>
      <h2 style={{color:'tomato'}}>Your Reviews</h2>
        {userReviews && userReviews.map(review => {
          return (
            <h4>{review.text}</h4>
          )
        })}
    </div>

    <div className='user-restaurants'>
      <h2 style={{color:'tomato'}}>Your Restaurants</h2>
        {userRestaurants && userRestaurants.map(place => {
          return(
            <>
              <h4>{place.name}</h4>
              <NavLink to={`/restaurants/${place.id}`}>
                <img src={place.logo} style={{height:'300px', width:'auto'}}></img>
              </NavLink>
            </>
          )
        })}
    </div>
    </>
  );
}
export default User;
