import React from 'react';
import './homepage.css'



function HomePage() {

    return (
        <>
            <div className='homepage-container'>
                <img className='homepageImage' src='./restaurant2.jpg' alt='restaurant'></img>
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