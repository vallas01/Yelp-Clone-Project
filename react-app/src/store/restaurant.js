const GET_RESTAURANTS = 'restaurants/GET_RESTAURANTS';
const ADD_RESTAURANT = 'restaurants/ADD_RESTAURANT';
const UPDATE_RESTAURANT = 'restaurants/UPDATE_RESTAURANT';
const DELETE_RESTAURANT = 'restaurants/DELETE_RESTAURANT';

const getRestaurants = (data) => ({
    type: GET_RESTAURANTS,
    payload: data
})


const addRestaurant = (data) => ({
    type: ADD_RESTAURANT,
    payload: data
})

const updateRestaurant = (data) => ({
    type: UPDATE_RESTAURANT,
    payload: data
})

const deleteRestaurant = (data) => ({
    type: DELETE_RESTAURANT,
    payload: data
})


export const updateRestaurantThunk = (restaurantInfo) => async (dispatch) => {
    const response = await fetch('/api/restaurants', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            restaurantInfo
        )
    })

    if (response.ok) {
        const updatedRestaurant = await response.json()
        dispatch(updateRestaurant(updatedRestaurant))
        return updatedRestaurant
    } else {
        const res = await response.json()
        return res.errors
    }

}



export const getRestaurantsThunk = () => async (dispatch) => {
    const response = await fetch('/api/restaurants')

    if (response.ok) {
        const data = await response.json();
        dispatch(getRestaurants(data))
        // console.log(data)

        return data
    }
}

export const addRestaurantThunk = (newRestaurant) => async (dispatch) => {
    const response = await fetch('/api/restaurants', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(newRestaurant)
    })
    // console.log("addRestaurantThunk", response)

    if (response.ok) {
        const new_restaurant = await response.json();
        dispatch(addRestaurant(new_restaurant))
        return new_restaurant;
    } else {
        const errors = await response.json()
        return errors
    }

    // console.log(d)
}


export const deleteRestaurantThunk = (restaurantId) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        dispatch(deleteRestaurant(restaurantId))
        return null

    }
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

        case ADD_RESTAURANT:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState

        case UPDATE_RESTAURANT:
            newState[action.payload.id] = action.payload
            return newState

        case DELETE_RESTAURANT:
            delete newState[action.payload]
            return newState

        default:
            return state;
    }
}
