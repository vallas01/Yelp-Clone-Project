import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/review'


function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
    
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // const user_id = sessionUser.id
    const newReview = {
        user_id: 1,
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



    
  return (
    <>
      <h1> Enter Review </h1>

      {errors.length>0 && (
      <ul className='error-container'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      )}

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