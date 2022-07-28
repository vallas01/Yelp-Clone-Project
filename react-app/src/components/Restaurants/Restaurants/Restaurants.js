import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { getRestaurantsThunk } from "../../../store/restaurant"
import { NavLink } from 'react-router-dom';
import { useSearchBar } from "../../../context/SearchBarContext";
import './Restaurants.css'
const Restaurants = () => {
  const dispatch = useDispatch()
  const restaurants = Object.values(useSelector(state => state.restaurant)).reverse()
  const { searchTerm, setSearchTerm } = useSearchBar()
  console.log('SEARCHTERM', searchTerm)

  useEffect(() => {
    (async function () {
      const response = await fetch('/api/restaurants/here');
      const responseData = await response.json();
      console.log(responseData)
    })()
  }, [dispatch])

  if (!restaurants) {
    return ("loading")
  }

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      || restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
      || restaurant.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })







  return (<div className="Restaurants-Page-Container">
    <div className="restaurants-filters">

    </div>
    <div className="restaurants-page-details">
      <h1>{searchTerm.toUpperCase()}</h1>
      {filteredRestaurants.map(restaurant => {
        return (<li key={restaurant.id}>
          <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
        </li>
        )
      })}
    </div>
    <div className="restaurants-map-details">

    </div>
  </div>)
}


export default Restaurants
