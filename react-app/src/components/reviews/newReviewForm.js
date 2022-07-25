import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/review'
import './index.css'


function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  const user = useSelector(state => state.session.user)
  // const restaurant = useSelector(state => state.restaurant)
  
    
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    
    const newReview = {
        user_id: user.id,
        restaurant_id: 1,
        text,
        rating
    };
    
    dispatch(createReview(newReview))
        .then(()=>history.push(`/account`))
        .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
    });
    // reset();
  }

  const handleSetRating = e => {
    if (e.target.value > 0 && e.target.value <= 5) {
      setRating(e.target.value)
    } else {
      setRating('')
    }
  }



    
  return (
    <>
      <h1> Enter Review </h1>

      {errors.length>0 && (
      <ul className='error-container'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      )}

      <label>Rating: 1 to 5</label>
                <input onChange={e => handleSetRating(e)} id='rating-input' type='text' placeholder='1 to 5' value={rating}></input>
      
      <label>Review</label>

      <form onSubmit={handleSubmit} className="login-form">
      
                <label>
                Enter your review information...
                </label>

                
                <input
                    type="text"
                    placeholder='Enter your review...'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />/
                <select
                    className='dropList'
                    value={rating}
                    required
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value='' disabled  >How many stars...</option>
                    <option value='1'>One Star</option>
                    <option value='2'>Two Stars</option>
                    <option value='3'>Three Stars</option>
                    <option value='4'>Four Stars</option>
                    <option value='4'>Five Stars</option>
                </select>
        <button className='hostSubmit' type="submit">Submit</button>
      </form>
    </>
  );
}

export default ReviewForm;