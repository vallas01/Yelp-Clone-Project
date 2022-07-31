import { useEffect } from "react"
import { useDispatch } from "react-redux"
// import { getRestaurantsThunk } from "../../../store/restaurant"
import { useHistory } from 'react-router-dom';
import { useSearchBar } from "../../../context/SearchBarContext";
import { useState } from "react";
import './Restaurants.css'


const Restaurants = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [restaurants, setRestaurants] = useState('')
  const { searchTerm } = useSearchBar()

  useEffect(() => {
    (async function () {
      const response = await fetch('/api/restaurants/2');
      const responseData = await response.json();
      setRestaurants(responseData.restaurant)
    })()
  }, [dispatch])

  const handleClick = (restaurant) => {
    history.push(`/restaurants/${restaurant.id}`)
  }

  if (!restaurants) {
    return ("loading")
  }

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      || restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
      || restaurant.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })
  console.log(restaurants[3].reviews)

  for (let restaurant of filteredRestaurants) {
    let count = 0
    for (let review of restaurant.reviews) {
      count += review['rating']
    }
    if (count !== 0) restaurant["rating"] = Number((count / restaurant.reviews.length).toFixed())
    else restaurant["rating"] = count
  }





  return (<div className="Restaurants-Page-Container">
    <div className="restaurants-filters">

    </div>
    <div className="restaurants-page-details">
      <h1 className="restaurants-details-h1">All {searchTerm} Results</h1>

      {filteredRestaurants.map(restaurant => {
        return (<div className="individual-restaurant-details" key={restaurant.id}
          onClick={() => handleClick(restaurant)}
        >
          <img className="restaurant-logo" src={restaurant.logo} alt='logo' />
          <div className="restaurant-details-container">
            <div className="upperRestaurant-details">
              <div className="restaurant-information">
                <span className="restaurant-name" to={`/restaurants/${restaurant.id}`}>{restaurant.name}</span>
                <div className="restaurant-address top-address"> {restaurant.address} </div>
                <div className="restaurant-address bottom-address"> {restaurant.city} {restaurant.state} {restaurant.zip}</div>
              </div>
              <div className="restaurant-category"> <div style={{ marginBottom: "20px" }}>Category</div>
                {restaurant.category}</div>

              <div className="restaurant-rating">
                {restaurant.rating === 5 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; &#9733; &#9733; &#9733; &#9733;</label>
                )}
                {restaurant.rating === 4 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; &#9733; &#9733; &#9733; <span className="empty-stars">&#9733;</span> </label>
                )}
                {restaurant.rating === 3 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; &#9733; &#9733; <span className="empty-stars">&#9733; &#9733;</span></label>
                )}
                {restaurant.rating === 2 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; &#9733; <span className="empty-stars">&#9733; &#9733; &#9733;</span></label>
                )}
                {restaurant.rating === 1 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; <span className="empty-stars">&#9733; &#9733; &#9733; &#9733;</span> </label>
                )}
                {restaurant.rating === 0 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review"> <span className="no-reviews-yet">  No Ratings Yet </span></label>
                )}
              </div>
            </div>
            <div className="lowerRestaurant-details">
              {restaurant.reviews[0] && <>
                <div className="restaurant-review-owner-name">
                  <span> Reviewed By: </span>
                  {restaurant.reviews[0].owner.username}
                </div>
                <div className="restaurant-review-text">  {`"${restaurant.reviews[0].text}"`}</div>
                <div className="restaurant-review-rating">
                  {restaurant.reviews[0].rating === 5 && (
                    <label style={{ cursor: "pointer" }}
                      className="star-review">&#9733; &#9733; &#9733; &#9733; &#9733;</label>
                  )}
                  {restaurant.reviews[0].rating === 4 && (
                    <label style={{ cursor: "pointer" }}
                      className="star-review">&#9733; &#9733; &#9733; &#9733; <span className="empty-stars">&#9733;</span> </label>
                  )}
                  {restaurant.reviews[0].rating === 3 && (
                    <label style={{ cursor: "pointer" }}
                      className="star-review">&#9733; &#9733; &#9733; <span className="empty-stars">&#9733; &#9733;</span></label>
                  )}
                  {restaurant.reviews[0].rating === 2 && (
                    <label style={{ cursor: "pointer" }}
                      className="star-review">&#9733; &#9733; <span className="empty-stars">&#9733; &#9733; &#9733;</span></label>
                  )}
                  {restaurant.reviews[0].rating === 1 && (
                    <label style={{ cursor: "pointer" }}
                      className="star-review">&#9733; <span className="empty-stars">&#9733; &#9733; &#9733; &#9733;</span> </label>
                  )}
                </div>
              </>
              }
              {restaurant.reviews && !restaurant.reviews[0] && <>
                <div className="restaurant-review-owner-name"></div>
                <div className="restaurant-no-reviews">  No Reviews Yet</div>
              </>
              }

            </div>
          </div>
        </div>
        )
      })}
    </div>
    <div className="restaurants-map-details">

    </div>
  </div >)
}


export default Restaurants
