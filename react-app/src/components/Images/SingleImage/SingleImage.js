import { updateImage } from "../../../store/images"
import { useDispatch } from "react-redux"
import { useState } from "react"

const SingleImage = ({ img }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("")

  const handleEdit = e => {
    e.preventDefault()
    const updatedImage = {
      title,
      img_url: img.img_url,
      review_id: img.review_id,
      userId: img.user_id,
      restaurant_id: img.restaurant_id

    }
    if (!img.review_id) delete updatedImage["review_id"]
    console.log(updatedImage)
    dispatch(updateImage(updatedImage, img.id))
    setTitle("")
  }

  return (<div>
    <img style={{ width: "300px", height: "300px" }} src={img.img_url} alt={img.title} />
    <h1>{img.title}</h1>
    <form onSubmit={handleEdit}>
      <label htmlFor="ImageName"></label>
      <input
        id="ImageName"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}

      />

      <button >Change Name</button>
    </form>
  </div>)
}

export default SingleImage
