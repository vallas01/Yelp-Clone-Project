import { useSelector, useDispatch } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getRestaurantsThunk } from "../../../store/restaurant"
import UpdateRestaurantForm from "./UpdateRestaurant"
import RestaurantToDelete from "./DeleteRestaurant"
import { getAllImages } from "../../../store/images"
import SingleImageModal from "../../Images/SingleImage/SingleImageModal"
// import NewImage from "../../Images/NewImage"
// import ReviewForm from "../../reviews/newReviewForm"
import './SingleRestaurant.css'
import { getReviews } from "../../../store/review"
import { useHistory } from "react-router-dom"

const SingleRestaurant = () => {
  const dispatch = useDispatch()
  const { restaurantId } = useParams()
  const restaurant = useSelector(state => state?.restaurant[restaurantId])
  const images = useSelector(state => state?.image)
  const reviews = Object.values(useSelector(state => state?.review))
  const [users, setUsers] = useState([]);
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData);

    }
    fetchData();
  }, []);

  const owner = users[restaurant?.user_id]?.username
  const user = useSelector(state => state.session.user)
  const restaurantImgs = Object.values(images).filter(img => img.restaurant_id === Number(restaurantId))

  useEffect(() => {
    const func = async () => {
      const res = await dispatch(getRestaurantsThunk())
      if (!(res.restaurant.map(res => res.id).includes(Number(restaurantId)))) {
        history.replace('/restaurant-not-found')
      }
      dispatch(getAllImages())
      dispatch(getReviews())
    }

    func()
  }, [dispatch, history, restaurantId])

  if (!restaurant) return ("loading")

  const filteredReviews = reviews.filter(review => review.restaurant_id === restaurant.id)


  return (
    <div>

      <div className="single-image-page">
        <div className='restaurant-data-container'>
          <img className="logoRest" src={restaurant.logo} alt='logo'></img>
          <h2 className="nameRest">{restaurant.name}</h2>
          <p>{restaurant.address}</p>
          <p>{restaurant.city}, {restaurant.state} {restaurant.zip}</p>
          <div className="descRest">{restaurant.description}</div>
          <div className="ownerRest">Owner: {owner}</div>
        </div>

        {user && user.id === restaurant.user_id && (
          <div className="container-buttons">
            <UpdateRestaurantForm restaurant={restaurant} />
            <RestaurantToDelete restaurant={restaurant} />
          </div>
        )}

        <div className="restaurant-images-container">
          {restaurantImgs && restaurantImgs.map(img => {
            return (
              <div key={img.id} className="restaurant-single-image-container">
                <img className="imageRestaurant" src={img.img_url} alt={img.title} />
                <SingleImageModal img={img} />
              </div>
            )
          })}
        </div>

        <div className='container-redirect'>
          <NavLink className="navBtn" to={`/new-image/${restaurantId}`}>Add a Photo</NavLink>
        </div>

      </div>


      <div className="container-review">
        <h2>Reviews</h2>
        <div className='container-redirect'>

          <NavLink className="navBtn" to={`/new-review/${restaurantId}`}>Write a Review</NavLink>
        </div>
        <ul>

          {filteredReviews.map(review => {
            return (
              <li
                style={{
                  borderTop: "1px solid black"
                }}
                key={review.id}>
                <span className="reviewedBy">Reviewed By: {review.owner.username} </span>
                <div style={{
                  marginLeft: "50px",
                  marginBottom: "10px",
                  marginTop: "10px"
                }}
                >'{review.text}' </div>

                <div
                  style={{ marginLeft: "75px" }}
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


                </div >

              </li >
            )
          })}

        </ul >
      </div >

    </div >

  )
}

export default SingleRestaurant
