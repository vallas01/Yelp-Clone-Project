import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addRestaurantThunk } from '../../../store/restaurant'
import './NewRestaurant.css'

const RestaurantForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [logo, setLogo] = useState('')

  // *****FOR FUTURE FEATURES*****
  // const [price, setPrice] = useState('')
  // const [lat, setLat] = useState('')
  // const [lng, setLng] = useState('')

  const user = useSelector(state => state.session.user)

  const submitRestaurant = async (e) => {
    e.preventDefault()
    if (name.length < 3) {
      return setErrors(['Please enter a longer name'])
    }
    if (address.length < 3) {
      return setErrors(['Please enter a longer address'])
    }
    if (city.length < 3) {
      return setErrors(['Please enter a longer city name'])
    }
    if (zip.length < 5) {
      return setErrors(['Please enter at least 5 digits for the zipcode'])
    }
    if (description.length < 5) {
      return setErrors(['Please enter a longer description'])
    }
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(logo)) {
      return setErrors(['Please enter a valid image url'])
    }


    const newRestaurant = {
      name,
      user_id: user.id,
      address,
      city,
      state,
      zip,
      description,
      price: 1,
      category,
      lat: 1,
      lng: 1,
      logo
    }
    // console.log(newRestaurant)

    const myRest = await dispatch(addRestaurantThunk(newRestaurant))

    if (myRest.id) {
      history.push(`/restaurants/${myRest.id}`)
    } else {
      setErrors(["Address is already in use"])
    }

  }

  console.log("ERRORS", errors)
  return (
    <fieldset>


      <div className='error-container'>
        {errors.length > 0 && (
          <ul >
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        )}
      </div>



      <form onSubmit={submitRestaurant}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name"
            type="text"
            placeholder='Restaurant Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input id="address"
            type="text"
            placeholder='Restaurant Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input id="city"
            type="text"
            placeholder='Restaurant City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="state">State</label>
          <input id="state"
            type="text"
            placeholder='Restaurant State'
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="zip">Zip</label>
          <input id="zip"
            type="number"
            placeholder='Restaurant Zip'
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description"
            type="text"
            placeholder='Restaurant Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {/* FOR FUTURE DEVELOPMENT */}
        {/* <div>
        <label htmlFor="price">Price</label>
        <input id="price"
          type="number"
          placeholder='Restaurant Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div> */}
        <div>
          <label htmlFor="category">Category</label>
          <select id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='' disabled> Select A Food Category</option>
            <option value='Burgers'>Burgers</option>
            <option value='Chinese'>Chinese</option>
            <option value='Italian'>Italian</option>
            <option value='Mexican'>Mexican</option>
            <option value='Greek'>Greek</option>
            <option value='Coffee'>Coffe Shop</option>
            <option value='Donuts'>Donuts</option>
            <option value='Tacos'>Tacos</option>
          </select>
        </div>
        <div>
          <label htmlFor="logo">Logo</label>
          <input id="logo"
            type="text"
            placeholder='Restaurant Logo Image'
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            required
          />
        </div>

        {/* FOR FUTURE GOOGLE MAP FEATURE */}
        {/* <div>
        <label htmlFor="lat">Latitude</label>
        <input id="lat"
          type="number"
          placeholder='Location Latitude'
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lng">Longitude</label>
        <input id="lng"
          type="number"
          placeholder='Location Longitude'
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </div> */}
        {/* ******************************* */}
        <button>Submit</button>
      </form>
    </fieldset>
  )
}

export default RestaurantForm
