import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateRestaurantThunk } from "../../../store/restaurant"
import './EditRestaurantModal.css'

const UpdateRestaurantForm = ({ restaurant }) => {
  const { restaurantId } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const [openEdit, setOpenEdit] = useState(false)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState(restaurant.name)
  const [address, setAddress] = useState(restaurant.address)
  const [city, setCity] = useState(restaurant.city)
  const [state, setState] = useState(restaurant.state)
  const [zip, setZip] = useState(restaurant.zip)
  const [description, setDescription] = useState(restaurant.description)
  const [category, setCategory] = useState(restaurant.category)
  const [logo, setLogo] = useState(restaurant.logo)
  const [menuImg, setMenuImg] = useState(restaurant.menuImg)
  // const [lat, setLat] = useState(restaurant.lat)
  // const [lng, setLng] = useState(restaurant.lng)
  // const [price, setPrice] = useState(restaurant.price)

  const updateRestaurant = async e => {
    e.preventDefault()

    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(logo)) {
      return setErrors(['Please enter a valid image url'])
    }
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(menuImg)) {
      return setErrors(['Please enter a valid image url for Menu Image'])
    }

    const restaurantInfo = {
      restaurant_id: restaurantId,
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
      logo,
      menuImg
    }
    const response = await dispatch(updateRestaurantThunk(restaurantInfo))
    if (response.id) {
      setErrors([])
      setOpenEdit(!openEdit)
    } else {
      setErrors(["Address is already In Use"])
    }
  }


  const resetForm = () => {
    setOpenEdit(false)
    setErrors([])
    setName(restaurant.name)
    setAddress(restaurant.address)
    setCity(restaurant.city)
    setState(restaurant.state)
    setZip(restaurant.zip)
    setDescription(restaurant.description)
    setCategory(restaurant.category)
    setLogo(restaurant.logo)
  }

  if (user && user.id === restaurant.user_id) return (
    < div >
      <button onClick={() => { setOpenEdit(!openEdit) }}>Edit Restaurant</button>
      {
        openEdit &&
        <>
          <div className="editRestaurantModalBackground">
            <div className="editRestaurantModalContent">
              <button
                className="editRestaurantCloseButton"
                onClick={() => resetForm()}>X</button>
              <fieldset>
                <div className='error-container'>
                  {errors.length > 0 && (
                    <ul >
                      {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                  )}
                </div>
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
                    <label htmlFor="menuImg">Menu Image</label>
                    <input id="menuImg"
                      type="text"
                      placeholder='Restaurant Menu'
                      value={menuImg}
                      onChange={(e) => setMenuImg(e.target.value)}
                      required
                    />
                  </div>
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
                      <option value='Wings'>Wings</option>
                      <option value='Burgers'>Burgers</option>
                      <option value='Chinese'>Chinese</option>
                      <option value='Italian'>Italian</option>
                      <option value='Mexican'>Mexican</option>
                      <option value='Greek'>Greek</option>
                      <option value='Coffee'>Coffe Shop</option>
                      <option value='Donuts'>Donuts</option>
                      <option value='Tacos'>Tacos</option>
                      <option value='Pizza'>Pizza</option>
                      <option value='Ice Cream'>Ice Cream</option>
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
                  <button>Submit</button>
                </form>
              </fieldset>
            </div>
          </div>
        </>
      }
    </div >
  )
  return null
}

export default UpdateRestaurantForm
