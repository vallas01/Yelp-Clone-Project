import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import User from "./User"
import { updateUserThunk } from "../../store/session";

const UserUpdateForm = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state?.session.user)
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(sessionUser.username);
  const [address, setAddress] = useState(sessionUser.address);
  const [city, setCity] = useState(sessionUser.city);
  const [state, setState] = useState(sessionUser.state);
  const [zip, setZip] = useState(sessionUser.zip);
  const [avatar, setAvatar] = useState(sessionUser.avatar);
  const [openUpdateForm, setOpenUpdateForm] = useState(false)
  const { userId } = useParams();


  const changeName = e => setName(e.target.value)
  const changeAddress = e => setAddress(e.target.value)
  const changeCity = e => setCity(e.target.value)
  const changeState = e => setState(e.target.value)
  const changeZip = e => setZip(e.target.value)
  const changeAvatar = e => setAvatar(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()

    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(avatar)) {
      return setErrors(['Please enter a valid image url'])
    }

    const updatedUser = {
      user_id: sessionUser.id,
      username: name,
      address,
      city,
      state,
      zip,
      avatar
    }

    const response = await dispatch(updateUserThunk(updatedUser, userId))
    if (response.id) {
      history.push(`/users/${sessionUser.id}`)
      setOpenUpdateForm(!openUpdateForm)
      setErrors([])
    } else {
      setErrors(response.errors)
    }
  }


  return (<>
    <button className="open-update-user-form-button" onClick={() => setOpenUpdateForm(!openUpdateForm)}> Edit Profile</button>
    {openUpdateForm &&
      <fieldset>

        <form onSubmit={handleSubmit} className='user-details-form'>
          <div className='error-container'>
            {errors.length > 0 && (
              <ul >
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
            )}
          </div>
          <div className='info'>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name"
                type="text"
                placeholder={user.username}
                value={name}
                onChange={changeName}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input id="address"
                type="text"
                placeholder={user.address}
                value={address}
                onChange={changeAddress}
                required
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input id="city"
                type="text"
                placeholder={user.city}
                value={city}
                onChange={changeCity}
                required
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input id="state"
                type="text"
                placeholder={user.state}
                value={state}
                onChange={changeState}
                required
              />
            </div>
            <div>
              <label htmlFor="zip">Zip</label>
              <input id="zip"
                type="integer"
                placeholder={user.zip}
                value={zip}
                onChange={changeZip}
                required
              />
            </div>
            <div>
              <label htmlFor="avatar">Avatar</label>
              <input id="avatar"
                type="text"
                placeholder={'Img-URL'}
                value={avatar}
                onChange={changeAvatar}
                required
              />
            </div>
          </div>

          <button>Update</button>
        </form>
      </fieldset>}
  </>)
}


export default UserUpdateForm
