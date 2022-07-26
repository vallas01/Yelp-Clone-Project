import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getReviews, deleteReview } from '../../store/review';
import './index.css'
import Footer from '../Footer/Footer';

function Review() {
    const dispatch = useDispatch();
    const reviews = useSelector(state=> state.review)
    const history = useHistory()
    

    useEffect(() => {
        dispatch(getReviews())
    }, [dispatch]);

    const deleteThisReview = (id) => {
        dispatch(deleteReview(id))
        history.push(`/restaurants`)
    }


    
    return (
        <>
            <h1>Review</h1>
            <ul>

            {Object.values(reviews).map(review=>{
                return(
                    <li  key={review.id} >
                        <div>{review.text}</div>

                        <div>
                            { review.rating === 5 && (
                                <label  className="star-review">&#9733; &#9733; &#9733; &#9733; &#9733;</label>
                                )}
                            { review.rating === 4 && (
                                <label  className="star-review">&#9733; &#9733; &#9733; &#9733;</label>
                                )}
                            { review.rating === 3 && (
                                <label  className="star-review">&#9733; &#9733; &#9733;</label>
                                )}
                            { review.rating === 2 && (
                                <label  className="star-review">&#9733; &#9733;</label>
                                )}
                            { review.rating === 1 && (
                                <label  className="star-review">&#9733;</label>
                                )}
                        </div>
                        
                         <button onClick={()=>deleteThisReview(review.id)}>Delete</button>
                    </li>
                )
            })}
                
           </ul>
           <Footer />
        </>
    );
}

export default Review;

