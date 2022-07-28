import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { getReviews } from "./../store/review"
import { getRestaurantsThunk } from "./../store/restaurant"
import { updateUserThunk } from "./../store/session"
import { deleteReview } from "./../store/review"
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
  const userReviews = Object.values(useSelector(state => state?.review)).filter(review => review?.user_id === Number(userId))
  const userRestaurants = Object.values(useSelector(state => state?.restaurant)).filter(restaurant => restaurant?.user_id === Number(userId))
  const allRestaurants = Object.values(useSelector(state => state?.restaurant))
  // console.log('COMPONENT HEREEEEEEEEEEEEEEE', userReviews)
  // console.log('COMPONENT HEREEEEEEEEEEEEEEE', allRestaurants)
  // const reviewRest = userRestaurants.filter(restName => restName.id == )

  const changeName = e => setName(e.target.value)
  const changeAddress = e => setAddress(e.target.value)
  const changeCity = e => setCity(e.target.value)
  const changeState = e => setState(e.target.value)
  const changeZip = e => setZip(e.target.value)
  const changeAvatar = e => setAvatar(e.target.value)

  const handleSubmit = async e => {


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

  const handleEdit = async e => {
    e.preventDefault()
    history.push()
  }
  const deleteThisReview = async (id) => {

    await dispatch(deleteReview(id))
    .then(() => getReviews())
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
      <div>
        <strong>User Id</strong> {userId}
      </div>
      <div>
        <strong>Username</strong> {user.username}
      </div>
      <div>
        <strong>Email</strong> {user.email}
      </div>


      <h2 className='user-detail-header' style={{color:'tomato'}}>User Details</h2>

    <form onSubmit={handleSubmit} className='user-details-form'>
      <div className='info'>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name"
            type="text"
            placeholder={user.username}
            value={name}
            onChange={changeName}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input id="address"
            type="text"
            placeholder={user.address}
            value={address}
            onChange={changeAddress}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input id="city"
            type="text"
            placeholder={user.city}
            value={city}
            onChange={changeCity}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input id="state"
            type="text"
            placeholder={user.state}
            value={state}
            onChange={changeState}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip</label>
          <input id="zip"
            type="integer"
            placeholder={user.zip}
            value={zip}
            onChange={changeZip}
          />
        </div>
        <div>
          <label htmlFor="avatar">Avatar</label>
          <input id="avatar"
            type="text"
            placeholder={'Img-URL'}
            value={avatar}
            onChange={changeAvatar}
          />
        </div>
      </div>


      <div className='user-avatar'>
        <img src={user.avatar} style={{height:'250px', width:'auto'}} alt='avatar'/>
      </div>
      <button>Update</button>
    </form>

    <div className='user-reviews'>
      <h2 style={{color:'tomato'}}>Your Reviews</h2>
      <ul>
        {userReviews && userReviews?.map(review => {
          return (
            <li key={review.id}>
            <>
              <h4>{allRestaurants[review?.restaurant_id - 1]?.name}</h4>
              <div>
                { review.rating === 5 && (
                    <label  className="star-review">&#9733; &#9733; &#9733; &#9733; &#9733;</label>
                    )}
                { review.rating === 4 && (
                    <label  className="star-review">&#9733; &#9733; &#9733; &#9733;</label>
                    )}
                { review.rating === 3 && (
                    <label  className="star-review">&#9733; &#9733; &#9733;</label>
                    )}
                { review.rating === 2 && (
                    <label  className="star-review">&#9733; &#9733;</label>
                    )}
                { review.rating === 1 && (
                    <label  className="star-review">&#9733;</label>
                    )}
              </div>
              <h4>{review.text}</h4>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={()=>deleteThisReview(review.id)}>Delete</button>
            </>
            </li>
          )
        })}
      </ul>
    </div>

    <div className='user-restaurants'>
      <h2 style={{color:'tomato'}}>Your Restaurants</h2>
      <ul>
        {userRestaurants && userRestaurants.map(place => {
          return(
            <li key={place.id}>
              <h4>{place.name}</h4>
              <NavLink to={`/restaurants/${place.id}`}>
                <img src={place.logo} style={{height:'300px', width:'auto'}} alt='logo'></img>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
    </>
  );
}
export default User;
