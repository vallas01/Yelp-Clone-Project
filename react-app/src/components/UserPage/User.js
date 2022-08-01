import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getReviews } from "../../store/review"
import { getRestaurantsThunk } from "../../store/restaurant"
import { deleteReview } from "../../store/review"
import UserUpdateForm from './UserUpdateForm';
import './UserPage.css'

function User() {
  const dispatch = useDispatch()
  const history = useHistory()

  const sessionUser = useSelector(state => state?.session.user)

  const [user, setUser] = useState({});
  const { userId } = useParams();
  const userReviews = Object.values(useSelector(state => state?.review)).filter(review => review?.user_id === Number(userId))
  const userRestaurants = Object.values(useSelector(state => state?.restaurant)).filter(restaurant => restaurant?.user_id === Number(userId))
  const restaurants = Object.values(useSelector(state => state?.restaurant))
  const allRestaurants = {}

  restaurants.forEach(restaurant => {
    allRestaurants[restaurant.id] = restaurant
  })

  // console.log('COMPONENT HEREEEEEEEEEEEEEEE', userReviews)
  // console.log('COMPONENT HEREEEEEEEEEEEEEEE', allRestaurants)
  // const reviewRest = userRestaurants.filter(restName => restName.id == )


  const handleEdit = async (id) => {
    history.push(`/edit-review/${id}`)
  }

  const deleteThisReview = async (id) => {

    await dispatch(deleteReview(id))
      .then(() => getReviews())
  }

  useEffect(() => {
    dispatch(getReviews())
    dispatch(getRestaurantsThunk())
  }, [dispatch])

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const allResponse = await fetch('/api/users/')
      const allUsers = await allResponse.json()
      if (!(userId in allUsers)) {
        history.replace('/user-not-found')
      }
      const user = allUsers[userId]
      setUser(user);
    })();
  }, [userId, sessionUser, history]);

  if (!user) {
    return null;
  }



  return (
    <div>
      <div className="user-header">
        <h2 className='user-detail-header' style={{ color: 'tomato' }}>User Details</h2>
        <div className='user-header-details'>
          <img src={user.avatar} style={{ height: '250px', width: 'auto' }} alt='avatar' />
          <div className='user-details-info'>
            {/* <strong>User Id: <span style={{ fontWeight: "normal" }}>{userId} </span> </strong> */}
            <strong>Username: <span style={{ fontWeight: "normal" }}>{user.username} </span></strong>
            <strong>Address: <span style={{ fontWeight: "normal" }}>{user.address} </span></strong>
            <strong> City: <span style={{ fontWeight: "normal" }}>{user.city} </span></strong>

            <strong>Email: <span style={{ fontWeight: "normal" }}>{user.email} </span> </strong>
          </div>
          {sessionUser && sessionUser.id === user.id && <UserUpdateForm user={user} />}
        </div>
      </div>

      <>
        <div className='user-reviews'>
          <h2 style={{ color: 'tomato' }}>{user.username}'s Reviews</h2>
          <ul>
            {userReviews && userReviews?.map(review => {
              return (
                <li className='user-individual-review' key={review.id}>
                  <>
                    <h4 style={{ marginBottom: "0" }}> Restaurant: {allRestaurants[review.restaurant_id]?.name}</h4>
                    <div>
                      <h4
                        style={{
                          marginTop: "15px",
                          marginLeft: "50px",
                          marginBottom: "10px"
                        }}

                      > "{review.text}"
                      </h4>
                      <div
                        style={{
                          marginBottom: "20px",
                          marginLeft: "50px"
                        }}
                      >
                        {review.rating === 5 && (
                          <label style={{ cursor: "pointer" }}
                            className="star-review">&#9733; &#9733; &#9733; &#9733; &#9733;</label>
                        )}
                        {review.rating === 4 && (
                          <label style={{ cursor: "pointer" }}
                            className="star-review">&#9733; &#9733; &#9733; &#9733; <span className="empty-stars">&#9733;</span> </label>
                        )}
                        {review.rating === 3 && (
                          <label style={{ cursor: "pointer" }}
                            className="star-review">&#9733; &#9733; &#9733; <span className="empty-stars">&#9733; &#9733;</span></label>
                        )}
                        {review.rating === 2 && (
                          <label style={{ cursor: "pointer" }}
                            className="star-review">&#9733; &#9733; <span className="empty-stars">&#9733; &#9733; &#9733;</span></label>
                        )}
                        {review.rating === 1 && (
                          <label style={{ cursor: "pointer" }}
                            className="star-review">&#9733; <span className="empty-stars">&#9733; &#9733; &#9733; &#9733;</span> </label>
                        )}
                      </div>
                    </div>
                    {sessionUser && sessionUser.id === user.id && (<>
                      <button onClick={() => handleEdit(review.id)}>Edit</button>
                      <button onClick={() => deleteThisReview(review.id)}>Delete</button></>)}
                  </>
                </li>
              )
            })}
          </ul>
        </div>

        <div className='user-restaurants'>
          <h2 style={{ color: 'tomato' }}>{user.username}'s Restaurants</h2>
          <ul>
            {userRestaurants && userRestaurants.map(place => {
              return (
                <li key={place.id}>
                  <h4>{place.name}</h4>
                  <NavLink to={`/restaurants/${place.id}`}>
                    <img src={place.logo} style={{ height: '300px', width: 'auto' }} alt='logo'></img>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    </div>
  );
}
export default User;
