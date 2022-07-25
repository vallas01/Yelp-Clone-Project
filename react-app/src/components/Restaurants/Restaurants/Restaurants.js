import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRestaurantsThunk } from "../../../store/restaurant"
import { NavLink } from 'react-router-dom';

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
      return (<li key={restaurant.id}>
        <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
      </li>
      )
    })}
  </div>)
}


export default Restaurants
