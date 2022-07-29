import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReview } from '../../store/review'
import './index.css'


function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  const user = useSelector(state => state.session.user)
  const { restaurantId } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (!rating) {
      return setErrors(['You must enter at least one star ! ! !'])
    }


    const newReview = {
      user_id: user.id,
      restaurant_id: restaurantId,
      text,
      rating
    };


    dispatch(createReview(newReview))
      .then(() => history.push(`/restaurants/${restaurantId}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    // reset();
  }






  return (
    <>
      <h1> Enter Review </h1>

      <div className='error-container'>
        {errors.length > 0 && (
          <ul >
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        )}
      </div>




      <form onSubmit={handleSubmit} className="review-form">

        <label>
          Enter your review information...
        </label>


        <div className="star-rating">
          <input type="radio" id="5-stars" value="5" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="5-stars">&#9733;</label>
          <input type="radio" id="4-stars" value="4" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="4-stars">&#9733;</label>
          <input type="radio" id="3-stars" value="3" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="3-stars">&#9733;</label>
          <input type="radio" id="2-stars" value="2" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="2-stars">&#9733;</label>
          <input type="radio" id="1-star" value="1" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="1-star">&#9733;</label>
        </div>


        <input
          type="text"
          placeholder='Enter your review...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />


        <button className='hostSubmit' type="submit">Submit</button>
      </form>

    </>
  );
}

export default ReviewForm;
