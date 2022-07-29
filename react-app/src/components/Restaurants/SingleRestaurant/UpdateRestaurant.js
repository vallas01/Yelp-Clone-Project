import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateRestaurantThunk } from "../../../store/restaurant"

const UpdateRestaurantForm = ({ restaurant }) => {
  const { restaurantId } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const [openEdit, setOpenEdit] = useState(false)

  const [name, setName] = useState(restaurant.name)
  const [address, setAddress] = useState(restaurant.address)
  const [city, setCity] = useState(restaurant.city)
  const [state, setState] = useState(restaurant.state)
  const [zip, setZip] = useState(restaurant.zip)
  const [description, setDescription] = useState(restaurant.description)
  const [price, setPrice] = useState(restaurant.price)
  const [category, setCategory] = useState(restaurant.category)
  const [lat, setLat] = useState(restaurant.lat)
  const [lng, setLng] = useState(restaurant.lng)
  const [logo, setLogo] = useState(restaurant.logo)

  const updateRestaurant = e => {
    e.preventDefault()

    const restaurantInfo = {
      restaurant_id: restaurantId,
      name,
      user_id: user.id,
      address,
      city,
      state,
      zip,
      description,
      price,
      category,
      lat,
      lng,
      logo
    }
    dispatch(updateRestaurantThunk(restaurantInfo))
    setOpenEdit(!openEdit)

  }

  if (user && user.id === restaurant.user_id) return (
    < div >
      <button onClick={() => { setOpenEdit(!openEdit) }}>Edit Restaurant</button>
      {
        openEdit &&
        <fieldset>
          <form onSubmit={updateRestaurant}>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name"
                type="text"
                placeholder='Restaurant Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input id="address"
                type="text"
                placeholder='Restaurant Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input id="city"
                type="text"
                placeholder='Restaurant City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input id="state"
                type="text"
                placeholder='Restaurant State'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="zip">Zip</label>
              <input id="zip"
                type="number"
                placeholder='Restaurant Zip'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description"
                type="text"
                placeholder='Restaurant Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input id="price"
                type="number"
                placeholder='Restaurant Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='' disabled> Select A Food Category</option>
                <option value='Donuts'>Donuts</option>
                <option value='Tacos'>Tacos</option>
                <option value='Burgers'>Burgers</option>
              </select>
            </div>
            <div>
              <label htmlFor="logo">Logo</label>
              <input id="logo"
                type="text"
                placeholder='Restaurant Logo Image'
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
            </div>
            <div>
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
            </div>
            <button>Submit</button>
          </form>
        </fieldset>
      }
    </div >
  )
  return null
}

export default UpdateRestaurantForm
