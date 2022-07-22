import React, {useState} from 'react';


function ReviewForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
    
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   const user_id = sessionUser.id
  //   const newReview = {
  //       user_id,
  //       restaurant_id,
  //       text,
  //       rating
  //   };
  //   dispatch(createReview(newReview))
  //       .then(()=>history.push(`/account`))
  //       .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //   });
  //   reset();
  // }



    
  return (
    <>
      <h1> Enter Review </h1>

      {/* <form onSubmit={handleSubmit} className="login-form"> */}
      <form  className="login-form">

                <label>
                Enter your dock information...
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