import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRestaurantsThunk } from "../../store/restaurant"


const Restaurants = () => {
  const dispatch = useDispatch()
  const restaurants = Object.values(useSelector(state => state.restaurant)).reverse()

  useEffect(() => {
    dispatch(getRestaurantsThunk())
  }, [dispatch])

  // console.log("allRestaurants.js", restaurants)




  if (!restaurants) {
    return ("loading")
  }

  return (<div>
    {restaurants.map(restaurant => {
      return (<div key={restaurant.id}>
        {restaurant.name}
      </div>)
    })}
  </div>)
}


export default Restaurants
