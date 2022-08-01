import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleImage from './SingleImage';
import './SingleImageModal.css'

function SingleImageModal({ img }) {
  const [openModal, setOpenModal] = useState(false)
  const user = useSelector(state => state.session.user)

  return (<>
    {user && user.id === img.user_id && <button onClick={() => setOpenModal(true)}>Edit Image</button>}
    {openModal && <div className="ImageModalBackground">
      <div className="ImageModalContent">
        <button
          style={{ alignSelf: "start" }}
          onClick={() => setOpenModal(false)}>X</button>
        <SingleImage img={img} />
      </div>
    </div>}
  </>)

}

export default SingleImageModal
