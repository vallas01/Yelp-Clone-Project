import { useSelector, useDispatch } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getRestaurantsThunk } from "../../../store/restaurant"
import UpdateRestaurantForm from "./UpdateRestaurant"
import RestaurantToDelete from "./DeleteRestaurant"
import { getAllImages } from "../../../store/images"
import SingleImageModal from "../../Images/SingleImage/SingleImageModal"
import NewImage from "../../Images/NewImage"
import ReviewForm from "../../reviews/newReviewForm"
import './SingleRestaurant.css'

const SingleRestaurant = () => {
  const dispatch = useDispatch()
  const { restaurantId } = useParams()
  const restaurant = useSelector(state => state.restaurant[restaurantId])
  const images = useSelector(state => state?.image)
  const user = useSelector(state => state.session.user)

  //this one below is an array of all images that filter
  const restaurantImgs = Object.values(images).filter(img => img.restaurant_id === Number(restaurantId))

  useEffect(() => {
    dispatch(getRestaurantsThunk())
    dispatch(getAllImages())
  }, [dispatch])

  if (!restaurant) return ("loading")

  return (
    <div>
      <div>
          <NavLink className="navBtn" to="/new-image">Add a Photo</NavLink>
          <NavLink className="navBtn" to="/new-review">Write a Review</NavLink>
      </div>
      
      <div>

          <h1>{restaurant.name}</h1>
          {restaurantImgs && restaurantImgs.map(img => {
              return (
                <div key={img.id} className="restaurant-image-container">
                  <img className="imageRestaurant" src={img.img_url} alt={img.title} />
                  <SingleImageModal img={img} />
                </div>
              )
          })}
      </div>

      <div className="container-buttons">
          <UpdateRestaurantForm restaurant={restaurant} />
          <RestaurantToDelete restaurant={restaurant} />
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
