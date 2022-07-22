const GET_RESTAURANTS = 'restaurants/GET_RESTAURANTS';
const ADD_RESTAURANT = 'restaurants/ADD_RESTAURANT';

const getRestaurants = (restaurants) => ({
    type: GET_RESTAURANTS,
    payload: restaurants
})


export const getRestaurantsThunk = () => async (dispatch) => {
    const response = await fetch('/api/restaurants')

    if (response.ok) {
        const data = await response.json();
        dispatch(getRestaurants(data))

    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_RESTAURANTS:
            return { 'restaurants': action.payload}


        default:
            return state;
    }
}
