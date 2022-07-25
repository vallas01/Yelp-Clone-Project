import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getReviews, deleteReview } from '../../store/review';

function Review() {
    const dispatch = useDispatch();
    const reviews = useSelector(state=> state.review)
    

    useEffect(() => {
        dispatch(getReviews())
    }, [dispatch]);

    const deleteThisReview = (id) => {
        dispatch(deleteReview(id))
    }

    return (
        <>
            <h1>Review</h1>
            <ul>

            {Object.values(reviews).map(review=>{
                return(
                    <li  key={review.id} >
                        <div>{review.text}</div>
                        <div>{review.rating}</div>
                        <button onClick={()=>deleteThisReview(review.id)}>Delete</button>
                    </li>
                )
            })}
                
           </ul>
        </>
    );
}

export default Review;

