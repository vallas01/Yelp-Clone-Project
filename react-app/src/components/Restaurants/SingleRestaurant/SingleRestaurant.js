import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getRestaurantsThunk } from "../../../store/restaurant"
import UpdateRestaurantForm from "./UpdateRestaurant"
import RestaurantToDelete from "./DeleteRestaurant"


const SingleRestaurant = () => {
  const dispatch = useDispatch()
  const { restaurantId } = useParams()
  const restaurant = useSelector(state => state.restaurant[restaurantId])


  useEffect(() => {
    dispatch(getRestaurantsThunk())
  }, [dispatch])

  if (!restaurant) return ("loading")

  return (<div>
    <h1>{restaurant.name}</h1>
    <UpdateRestaurantForm />
    <RestaurantToDelete restaurantId={restaurant.id}/>
  </div>)
}

export default SingleRestaurant
