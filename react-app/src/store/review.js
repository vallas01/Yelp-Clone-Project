const LIST_REVIEWS = 'review/listReviews';
const ADD_REVIEW = 'review/addReview';
const REMOVE_REVIEW = 'review/removeReview';
const UPDATE_REVIEW = 'review/updateReview'


const listReviews = list => ({
  type: LIST_REVIEWS,
  list
});
const addReview = details => ({
  type: ADD_REVIEW,
  details
})
//eslint-disable-next-line
const removeReview = id => ({
  type: REMOVE_REVIEW,
  id
});
const editReview = updatedReview => ({
  type: UPDATE_REVIEW,
  updatedReview
});


/*-------- SELECTORS -------*/

export const getReviews = () => async (dispatch) => {
  const response = await fetch(`/api/review`);
  if (response.ok) {
    const list = await response.json();
    dispatch(listReviews(list));
  }
  return;
};


export const createReview = (details) => async dispatch => {

    const response = await fetch('/api/review', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(details)
    })
    
    if(response.ok){
      const newReview = await response.json()
      dispatch(addReview(newReview))
      return newReview;
    }
  };


export const updateReviewDetails = (reviewDetails, id) => async dispatch => {
  const response = await fetch(`/api/review/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewDetails)
  })
  if (response.ok) {
    const updatedReview = await response.json()
    dispatch(editReview(updatedReview))
    return updatedReview;
  }
};

export const deleteReview = (reviewId) => async dispatch => {
  const response = await fetch(`/api/review/${reviewId}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    const allReviews = await response.json();
    dispatch(removeReview(allReviews));
    return 'review deleted';
  }
};


/*-------- REDUCER -------*/
const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case LIST_REVIEWS: {
      newState = { ...state }
      action.list.review.forEach(review => newState[review.id] = review)
      return newState
    }

    case ADD_REVIEW: {
      newState = { ...state };
      newState = { ...state, [action.details.id]: action.details }
      return newState;
    }

    case UPDATE_REVIEW: {
      newState = { ...state };
      newState = { ...state, [action.updatedReview.id]: action.updatedReview }
      return newState
    }

    case REMOVE_REVIEW: {
      newState = { ...state }
      delete newState[action.id.id]
      return newState
    }

    default:
      return state;

  }

};

export default reviewReducer;
