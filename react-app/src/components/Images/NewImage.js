// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import { Link, useHistory, useParams } from 'react-router-dom';
import { createImage } from '../../store/images'

function NewImage() {
    const { restaurantId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = user.id
    // eslint-disable-next-line
    const history = useHistory()

    const [title, setTitle] = useState("");
    const [img_url, setImgUrl] = useState("");
    const [errors, setErrors] = useState([]);

    const changeTitle = e => setTitle(e.target.value)
    const changeUrl = e => setImgUrl(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()
        if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(img_url)) {
            return setErrors(['Please enter a valid image url'])
        }
        const data = { userId, restaurant_id: restaurantId, title, img_url }

        const createdImg = await dispatch(createImage(data))
            .catch(
                async (res) => {
                    const validations = await res.json()

                    if (validations && validations.errors)
                        setErrors(validations.errors)
                }
            )

        if (createdImg)
            history.push(`/restaurants/${restaurantId}`)

    }

    return (
        <>
            <h1>Upload Image</h1>
            <div className='create-form'>

                <form onSubmit={handleSubmit}>
                    <div className='error-container'>
                        <ul>
                            {errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>
                    <label>
                        <div>Photo Name
                            <input className='create-input'
                                type="text"
                                placeholder='Title'
                                value={title}
                                onChange={changeTitle}
                                required
                            />
                        </div>
                    </label>
                    <label>
                        <div>
                            Source
                            <input className='create-input'
                                type="text"
                                placeholder='Image URL'
                                value={img_url}
                                onChange={changeUrl}
                                required
                            />
                        </div>
                    </label>
                    <div className='create-buttons'>
                        <button type="submit">Upload Image</button>
                        {/* <button onClick={handleCancel}>Cancel</button> */}
                    </div>

                </form>
            </div>
        </>
    )
}

export default NewImage
