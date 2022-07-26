import React, { useEffect, useState } from 'react';
import './homepage.css'



function HomePage() {
    const [count, setCount] = useState(2)

    // useEffect(() => {
    //     const timer = setInterval(() => {
    // })
      

    return (
        <>
            <div className='homepage-container'>
                {count ===1 && (
                    <img className='homepageImage' src='./restaurant1.jpg' alt='restaurant'></img>
                )}
                {count ===2 && (
                    <img className='homepageImage' src='./restaurant2.jpg' alt='restaurant'></img>
                )}
                {count ===3 && (
                    <img className='homepageImage' src='./restaurant3.jpg' alt='restaurant'></img>
                )}
            </div>
            <div className='homepage-tagline'>
                Heading Out?  Bring Kelp-Me with you
            </div>
            <div className='homepage-list'>
                <label> Our 8 Best Restaurants on Kelp-Me</label>
            </div>
        </>
    )
}

export default HomePage