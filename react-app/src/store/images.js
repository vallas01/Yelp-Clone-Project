import {csrfFetch} from './csrf'

const LOAD_IMAGES = 'images/LOAD'

const load_images = images => ({
    type: LOAD_IMAGES,
    images
})

export const getAllImages = () => async dispatch => {
    const response = await csrfFetch('/api/images')

    if(response.ok){
        const images = await response.json()
        dispatch(load_images(images))
    }
}

const initialState = {}

const imagesReducer = (state = initialState, action) => {
    let newState = {}

    switch(action.type) {
        case LOAD_IMAGES:
            action.images.forEach(img => {
                newState[img.id] = img
            })
            return newState

        default:
            return state
    }
}

export default imagesReducer
