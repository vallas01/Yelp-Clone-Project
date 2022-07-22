const GET_RESTAURANTS = 'restaurants/GET_RESTAURANTS';
// const ADD_RESTAURANT = 'restaurants/ADD_RESTAURANT';

const getRestaurants = (data) => ({
    type: GET_RESTAURANTS,
    payload: data
})


export const getRestaurantsThunk = () => async (dispatch) => {
    const response = await fetch('/api/restaurants')

    if (response.ok) {
        const data = await response.json();
        dispatch(getRestaurants(data))
        console.log(data)

    }
    return null
}

const initialState = {}

export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {

        case GET_RESTAURANTS:
            action.payload.restaurant.forEach(restaurant => {
                newState[restaurant.id] = restaurant
            })
            return newState
        default:
            return state;
    }
}
