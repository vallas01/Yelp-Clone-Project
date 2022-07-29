import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsThunk } from "../../store/restaurant";
import { getReviews } from "../../store/review";
import { useHistory } from 'react-router-dom'

const Top8Restaurants = () => {
  const dispatch = useDispatch()
  // const [topRestaurants, setTopRestaurants] = useState([])
  const history = useHistory()

  const restaurants = Object.values(useSelector(state => state.restaurant))
  let reviews = Object.values(useSelector(state => state.review))
  let topRestaurants = []

  if (reviews) {
    for (let restaurant of restaurants) {
      let count = 0
      let resReviews = reviews.filter(review => review.restaurant_id === restaurant.id)
      for (let review of resReviews) {
        count += review['rating']
      }
      if (count !== 0) restaurant["rating"] = Number((count / resReviews.length).toFixed())
      else restaurant["rating"] = count
      console.log(typeof restaurant.rating)
    }
    topRestaurants = [...restaurants].sort((a, b) => (a.rating < b.rating) ? 1 : -1).splice(0, 8)
  }

  const handleClick = (restaurant) => {
    history.push(`/restaurants/${restaurant.id}`)
  }

  useEffect(() => {
    dispatch(getRestaurantsThunk())
    dispatch(getReviews())
  }, [dispatch])

  return (<>
    <div className='homepage-list'>
      <label> Our 8 Best Restaurants on Kelp-Me</label>
      <div className='top8-Image-Container'>
        {topRestaurants.map(restaurant => (
          <div key={restaurant.id}>
            <h3>{restaurant.name} </h3>
            <div>
              <p>Rating: {restaurant.rating}</p>
              {restaurant.rating === 5 && (
                <label className="star-review">&#9733; &#9733; &#9733; &#9733; &#9733;</label>
              )}
              {restaurant.rating === 4 && (
                <label className="star-review">&#9733; &#9733; &#9733; &#9733;</label>
              )}
              {restaurant.rating === 3 && (
                <label className="star-review">&#9733; &#9733; &#9733;</label>
              )}
              {restaurant.rating === 2 && (
                <label className="star-review">&#9733; &#9733;</label>
              )}
              {restaurant.rating === 1 && (
                <label className="star-review">&#9733;</label>
              )}
              {restaurant.rating === 0 && (
                <label >No reviews yet</label>
              )}
            </div>
            <img className="top8-Image" onClick={() => handleClick(restaurant)} src={restaurant.logo} alt={restaurant.name} />
          </div>
        ))}
      </div>
    </div> </>)
}


export default Top8Restaurants










  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('/api/restaurants/top8')
  //     const top8 = await response.json()
  //     setTopRestaurants(top8.restaurants)
  //     console.log(top8)
  //   })();

  // }, [dispatch])
