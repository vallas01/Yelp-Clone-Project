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
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

console.log(users)

  const user = useSelector(state => state.session.user)

  //this one below is an array of all images that filter
  const restaurantImgs = Object.values(images).filter(img => img.restaurant_id === Number(restaurantId))

  useEffect(() => {
    dispatch(getRestaurantsThunk())
    dispatch(getAllImages())
    dispatch(getReviews())  
  }, [dispatch])

  if (!restaurant) return ("loading")

  return (
    <div>
      <div className='container-redirect'>
          <NavLink className="navBtn" to="/new-image">Add a Photo</NavLink>
          <NavLink className="navBtn" to="/new-review">Write a Review</NavLink>
      </div>
      
      <div className="single-image-page">

          <h1>{restaurant.name}</h1>
          <div className="restaurant-images-container">
          {restaurantImgs && restaurantImgs.map(img => {
              return (
                <div key={img.id} className="restaurant-image-container">
                  <img className="imageRestaurant" src={img.img_url} alt={img.title} />
                  <SingleImageModal img={img} />
                </div>
              )
          })}
          </div>
      </div>

      
      { user.id===restaurant.user_id && (
        <div className="container-buttons">
            <UpdateRestaurantForm restaurant={restaurant} />
            <RestaurantToDelete restaurant={restaurant} />
        </div>
      )}

      <div>
          <h2>Reviews</h2>
          <ul>

          {reviews.map(review => {
            return (
              <li key={review.id}>
                <p></p>

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
                  
                      <div>{review.text}</div>
                  
                </div>



                {/* <p> {review.user_id}</p> */}
                {/* {users.map(reviewOwner=>(
                    {if (reviewOwner.id===review.user_id) {
                        <p>{reviewOwner.email}</p>
                      }}
                ))} */}

              </li>
               )
              })}

          </ul>
      </div>
      
     
    {/* {restaurants.map(restaurant => {
      return (<li key={restaurant.id}>
        <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
      </li>
      )
    })} */}
 




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
