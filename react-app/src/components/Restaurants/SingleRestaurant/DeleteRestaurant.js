import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteRestaurantThunk } from "../../../store/restaurant"

const RestaurantToDelete = ({restaurantId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteRestaurant = async e => {
        e.preventDefault()
        await dispatch(deleteRestaurantThunk(restaurantId))
        history.push('/restaurants')
    }

    return (
        <div>
            <button onClick={deleteRestaurant}>
                Delete Restaurant
            </button>
        </div>
    )

}

export default RestaurantToDelete
