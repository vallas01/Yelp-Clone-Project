import React, { useEffect, useState } from 'react'
import './homepage.css'
import Top8Restaurants from './Top8Restaurants';



function HomePage() {
    const [count, setCount] = useState(3)


    useEffect(() => {

        const timer = setInterval(() => {
            setCount((count) => count + 1)
            if (count === 3) { setCount(1) }
        }, 6000);
        return () => clearInterval(timer)

    });


    return (
        <>
            <div className='homepage-container'>
                {count === 1 && (
                    <img className='homepageImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1658875840/restaurant1_vadale.jpg' alt='restaurant'></img>
                )}
                {count === 2 && (
                    <img className='homepageImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1658875820/restaurant2_xsywsl.jpg' alt='restaurant'></img>
                )}
                {count >= 3 && (
                    <img className='homepageImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1658875796/restaurant3_w9xnyu.jpg' alt='restaurant'></img>
                )
                }
            </div >
            <div className='homepage-tagline'>
                Heading Out?  Bring Kelp-Me with you
            </div>
            <Top8Restaurants />
        </>
    )
}

export default HomePage
