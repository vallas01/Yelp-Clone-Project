import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getReviews } from '../../store/review';

function Review() {
    const dispatch = useDispatch();
    const reviews = useSelector(state=> state.review)
    

    useEffect(() => {
        dispatch(getReviews())
    }, [dispatch]);

    return (
        <>
            <h1>Review</h1>
            <ul>

            {Object.values(reviews).map(review=>{
                return(
                    <li  key={review.id} >
                        <div>{review.text}</div>
                        <div>{review.rating}</div>
                    </li>
                )
            })}
                
           </ul>
        </>
    );
}

export default Review;

