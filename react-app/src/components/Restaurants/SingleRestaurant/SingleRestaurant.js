import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getRestaurantsThunk } from "../../../store/restaurant"
import UpdateRestaurantForm from "./UpdateRestaurant"
import RestaurantToDelete from "./DeleteRestaurant"
import { getAllImages } from "../../../store/images"
import SingleImageModal from "../../Images/SingleImage/SingleImageModal"


const SingleRestaurant = () => {
  const dispatch = useDispatch()
  const { restaurantId } = useParams()
  const restaurant = useSelector(state => state.restaurant[restaurantId])
  const images = useSelector(state => state?.image)
  //this one below is an array of all images that filter
  const restaurantImgs = Object.values(images).filter(img => img.restaurant_id == restaurantId)


  useEffect(() => {
    dispatch(getRestaurantsThunk())
    dispatch(getAllImages())
  }, [dispatch])

  if (!restaurant) return ("loading")

  return (<div>
    <h1>{restaurant.name}</h1>
    {restaurantImgs && restaurantImgs.map(img => {
      return (
        <div key={img.id}>
          <img src={img.img_url} />
          <SingleImageModal img={img} />
        </div>
      )
    })}
    <UpdateRestaurantForm />
    <RestaurantToDelete restaurantId={restaurant.id} />
  </div>)
}

export default SingleRestaurant
