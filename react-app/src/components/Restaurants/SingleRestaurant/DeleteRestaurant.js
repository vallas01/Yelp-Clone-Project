import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteRestaurantThunk } from "../../../store/restaurant"

const RestaurantToDelete = ({ restaurant }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)


    const deleteRestaurant = async e => {
        e.preventDefault()
        await dispatch(deleteRestaurantThunk(restaurant.id))
        history.push('/restaurants')
    }

    if (!user) {
        return (null)
    }
    return (
        <div>
            {
                user.id === restaurant.user_id
                &&
                <button onClick={deleteRestaurant}>Delete Restaurant</button>
            }
        </div>
    )

}

export default RestaurantToDelete
