import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/review'
import './index.css'
import Footer from '../Footer/Footer';


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
        .then(()=>history.push(`/review`))
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


                <div className="star-rating">
                  <input type="radio" id="5-stars" className='rating' value="5" 
                    onChange={(e) => setRating(e.target.value)} />
                  <label htmlFor="5-stars" className="star">&#9733;</label>
                  <input type="radio" id="4-stars" className='rating' value="4" 
                    onChange={(e) => setRating(e.target.value)} />
                  <label htmlFor="4-stars" className="star">&#9733;</label>
                  <input type="radio" id="3-stars" className='rating' value="3" 
                    onChange={(e) => setRating(e.target.value)} />
                  <label htmlFor="3-stars" className="star">&#9733;</label>
                  <input type="radio" id="2-stars" className='rating' value="2" 
                    onChange={(e) => setRating(e.target.value)} />
                  <label htmlFor="2-stars" className="star">&#9733;</label>
                  <input type="radio" id="1-star" className='rating' value="1" 
                    onChange={(e) => setRating(e.target.value)} />
                  <label htmlFor="1-star" className="star">&#9733;</label>
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
      <Footer />
    </>
  );
}

export default ReviewForm;