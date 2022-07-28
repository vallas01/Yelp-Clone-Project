import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRestaurantsThunk } from "../../../store/restaurant"
import { NavLink } from 'react-router-dom';
import { useSearchBar } from "../../../context/SearchBarContext";

const Restaurants = () => {
  const dispatch = useDispatch()
  const restaurants = Object.values(useSelector(state => state.restaurant)).reverse()
  const { searchTerm, setSearchTerm } = useSearchBar()
  console.log('SEARCHTERM', searchTerm)

  useEffect(() => {
    dispatch(getRestaurantsThunk())
  }, [dispatch])

  // console.log("allRestaurants.js", restaurants)

  if (!restaurants) {
    return ("loading")
  }

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      || restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
      || restaurant.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })
  console.log(filteredRestaurants)

  return (<div>
    <h1>{searchTerm.toUpperCase()}</h1>
    {filteredRestaurants.map(restaurant => {
      return (<li key={restaurant.id}>
        <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
      </li>
      )
    })}
  </div>)
}


export default Restaurants
