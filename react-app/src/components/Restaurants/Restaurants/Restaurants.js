import { useEffect } from "react"
import { useDispatch } from "react-redux"
// import { getRestaurantsThunk } from "../../../store/restaurant"
import { NavLink } from 'react-router-dom';
import { useSearchBar } from "../../../context/SearchBarContext";
import { useState } from "react";
import './Restaurants.css'


const Restaurants = () => {
  const dispatch = useDispatch()
  const [restaurants, setRestaurants] = useState('')
  const { searchTerm } = useSearchBar()
  console.log('SEARCHTERM', searchTerm)

  useEffect(() => {
    (async function () {
      const response = await fetch('/api/restaurants/2');
      const responseData = await response.json();
      setRestaurants(responseData.restaurant)
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

  console.log(restaurants.reviews)





  return (<div className="Restaurants-Page-Container">
    <div className="restaurants-filters">

    </div>
    <div className="restaurants-page-details">
      <h1 className="restaurants-details-h1">All {searchTerm} Results</h1>
      <div>

        {filteredRestaurants.map(restaurant => {
          return (<div className="individual-restaurant-details" key={restaurant.id}>
            <img className="restaurant-logo" src={restaurant.logo} />
            <div>
              <NavLink className="restaurant-name" to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
              <div className="restaurant-address"> {restaurant.address} </div>
              <div className="restaurant-address"> {restaurant.city} {restaurant.state} {restaurant.zip}</div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
    <div className="restaurants-map-details">

    </div>
  </div>)
}


export default Restaurants
