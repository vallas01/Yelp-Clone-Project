import {csrfFetch} from './csrf'

const LOAD_IMAGES = 'images/LOAD'
const CREATE_IMAGE = 'image/CREATE'
const UPDATE_IMAGE = 'image/UPDATE'
const DELETE_IMAGE = 'image/DELETE'

const load_images = images => ({
    type: LOAD_IMAGES,
    images
})

const create_image = image => ({
    type: CREATE_IMAGE,
    image
})
const update_image = image => ({
    type: UPDATE_IMAGE,
    image
})

const delete_image = imageId => ({
    type: DELETE_IMAGE,
    imageId
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

export const updateImage = (data, id) => async dispatch => {
    const response = await csrfFetch(`/api/images/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok){
        const image = await response.json()
        dispatch(update_image(image))
        return image
    }
};

export const deleteimage = imageId => async dispatch => {
    const response = await csrfFetch(`/api/images/delete/${imageId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        const deletedImage = await response.json()
        dispatch(delete_image(deletedImage))
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

        case UPDATE_IMAGE:
            return {...state, [action.image.id]: action.image}

        case DELETE_IMAGE:
            delete(newState[action.imageId.id])
            return newState

        default:
            return state
    }
}

export default imagesReducer
