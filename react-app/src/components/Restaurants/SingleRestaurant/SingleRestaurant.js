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

const SingleRestaurant = () => {
  const dispatch = useDispatch()
  const { restaurantId } = useParams()
  const restaurant = useSelector(state => state.restaurant[restaurantId])
  const images = useSelector(state => state?.image)
  const reviews = Object.values(useSelector(state=> state?.review))
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const user = useSelector(state => state.session.user)

  const restaurantImgs = Object.values(images).filter(img => img.restaurant_id === Number(restaurantId))

  useEffect(() => {
    dispatch(getRestaurantsThunk())
    dispatch(getAllImages())
    dispatch(getReviews())  
  }, [dispatch])

  if (!restaurant) return ("loading")

  const filteredReviews = reviews.filter(review=>review.restaurant_id===restaurant.id)


  return (
    <div>
      <div className='container-redirect'>
          <NavLink className="navBtn" to={`/new-image/${restaurantId}`}>Add a Photo</NavLink>
          <NavLink className="navBtn" to={`/new-review/${restaurantId}`}>Write a Review</NavLink>
      </div>
      
      <div className="single-image-page">

          <div className='restaurant-data-container'>
              <h2 className="nameRest">{restaurant.name}</h2>
              
              <p>{restaurant.address}</p>
              <p>{restaurant.city}, {restaurant.state} {restaurant.zip}</p>
              <p>{restaurant.description}</p>

          </div>
          
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

      </div>

      
      { user && user.id===restaurant.user_id && (
        <div className="container-buttons">
            <UpdateRestaurantForm restaurant={restaurant} />
            <RestaurantToDelete restaurant={restaurant} />
        </div>
      )}

      <div>
          <h2>Reviews</h2>
          <ul>

          {filteredReviews.map(review => {
            return (
              <li key={review.id}>
                
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
                  
                      <div>{review.text} <span className="reviewedBy">Reviewer: {review.owner.username} </span></div>
                  
                </div>

              </li>
               )
              })}

          </ul>
      </div>
      
     
    

      {
        user ?
          <div>
            
            
          </div>
          :
          <div>
            <p>Please log in to discover more features!</p>
          </div>
      }

    </div>

  )
}

export default SingleRestaurant
