import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsThunk } from '../../store/restaurant';
import './homepage.css'



function HomePage() {
    const dispatch = useDispatch()

    const [count, setCount] = useState(3)

    const restaurants = Object.values(useSelector(state => state.restaurant))
    const topRestaurants = restaurants.splice(0, 8)

    // useEffect(() => {
    //     const timer = setInterval(() => {

    // okay
    // })

    useEffect(() => {
        dispatch(getRestaurantsThunk())
    }, [dispatch])


    return (
        <>
            <div className='homepage-container'>
                {count === 1 && (
                    <img className='homepageImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1658875840/restaurant1_vadale.jpg' alt='restaurant'></img>
                )}
                {count === 2 && (
                    <img className='homepageImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1658875820/restaurant2_xsywsl.jpg' alt='restaurant'></img>
                )}
                {count === 3 && (
                    <img className='homepageImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1658875796/restaurant3_w9xnyu.jpg' alt='restaurant'></img>
                )}
            </div>
            <div className='homepage-tagline'>
                Heading Out?  Bring Kelp-Me with you
            </div>
            <div className='homepage-list'>
                <label> Our 8 Best Restaurants on Kelp-Me</label>
                <div className='top8-Image-Container'>
                    {topRestaurants.map(restaurant => (
                        <div>
                            <h3>{restaurant.name} </h3>
                            <img className="top8-Image" src={restaurant.logo} alt={restaurant.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage
