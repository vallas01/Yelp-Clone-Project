import {csrfFetch} from './csrf'

const LOAD_IMAGES = 'images/LOAD'
const CREATE_IMAGE = 'image/CREATE'

const load_images = images => ({
    type: LOAD_IMAGES,
    images
})

const create_image = image => ({
    type: CREATE_IMAGE,
    image
})

export const getAllImages = () => async dispatch => {
    const response = await fetch('/api/images')

    if(response.ok){
        const images = await response.json()
        dispatch(load_images(images))
    }
}

export const createImage = data => async dispatch => {
    const response = await fetch('/api/images/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(response.ok){
        const image = await response.json()
        dispatch(create_image)
        return image
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

        case CREATE_IMAGE:
            return {...state, [action.image.id]: action.image}

        default:
            return state
    }
}

export default imagesReducer
