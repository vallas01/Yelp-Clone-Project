import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { getReviews } from "./../store/review"
import { getRestaurantsThunk } from "./../store/restaurant"
import { updateUserThunk } from "./../store/session"
import './UserPage.css'

function User() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [avatar, setAvatar] = useState('');
  const { userId } = useParams();
  const userReviews = Object.values(useSelector(state => state?.review)).filter(review => review.user_id == userId)
  const userRestaurants = Object.values(useSelector(state => state.restaurant)).filter(restaurant => restaurant.user_id == userId)
  // console.log('COMPONENT HEREEEEEEEEEEEEEEE', userRestaurants)

  const changeName = e => setName(e.target.value)
  const changeAddress = e => setAddress(e.target.value)
  const changeCity = e => setCity(e.target.value)
  const changeState = e => setState(e.target.value)
  const changeZip = e => setZip(e.target.value)
  const changeAvatar = e => setAvatar(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()

    const updatedUser = {
      username: name,
      address,
      city,
      state,
      zip,
      avatar
    }

    const response = await dispatch(updateUserThunk(updatedUser, userId))
    if(response.ok){
      history.push(`/users`)
    }
  }


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

    <form onSubmit={handleSubmit} className='user-details'>
      <div className='info'>
        <h4>Name: {user.username}</h4>
        <h4>Address: {user.address}</h4>
        <h4>City: {user.city}</h4>
        <h4>State: {user.state}</h4>
        <h4>Zip: {user.zip}</h4>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name"
          type="text"
          placeholder={name}
          value={name}
          onChange={changeName}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input id="address"
          type="text"
          placeholder={address}
          value={address}
          onChange={changeAddress}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input id="city"
          type="text"
          placeholder={city}
          value={city}
          onChange={changeCity}
        />
      </div>
      <div>
        <label htmlFor="state">State</label>
        <input id="state"
          type="text"
          placeholder={state}
          value={state}
          onChange={changeState}
        />
      </div>
      <div>
        <label htmlFor="zip">Zip</label>
        <input id="zip"
          type="integer"
          placeholder={zip}
          value={zip}
          onChange={changeZip}
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input id="avatar"
          type="text"
          placeholder={avatar}
          value={avatar}
          onChange={changeAvatar}
        />
      </div>

      <div className='user-avatar'>
        <img src={user.avatar}/>
      </div>
      <button>Update</button>
    </form>

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
