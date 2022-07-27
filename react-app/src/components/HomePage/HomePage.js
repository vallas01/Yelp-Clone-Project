import React, { useEffect, useState } from 'react'
import './homepage.css'
import Top8Restaurants from './Top8Restaurants';



function HomePage() {
    const [count, setCount] = useState(0)

    const images = [
        'https://res.cloudinary.com/kelp-me/image/upload/v1658875840/restaurant1_vadale.jpg',
        'https://res.cloudinary.com/kelp-me/image/upload/v1658875820/restaurant2_xsywsl.jpg',
        'https://res.cloudinary.com/kelp-me/image/upload/v1658875796/restaurant3_w9xnyu.jpg']


    useEffect(() => {

        const timer = setInterval(() => {
            setCount((count) => count + 1)
            if (count === 2) { setCount(0) }
        }, 5000);
        return () => clearInterval(timer)

    });



    return (
        <>
            <div className='homepage-container'>
                <img className='homepageImage' src={images[count]} alt='restaurant'></img>
            </div>

            <div className='homepage-tagline'>
                Heading Out?  Bring Kelp-Me with you
            </div>

            <Top8Restaurants />
        </>
    )
}

export default HomePage
