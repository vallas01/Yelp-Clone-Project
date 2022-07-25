import React, { useState } from 'react';
import SingleImage from './SingleImage';
import './SingleImageModal.css'

function SingleImageModal({ img }) {
  const [openModal, setOpenModal] = useState(false)

  return (<>
    <button onClick={() => setOpenModal(true)}>Image</button>
    {openModal && <div className="ImageModalBackground">
      <div className="ImageModalContent">
        <button onClick={() => setOpenModal(false)}>X</button>
        <SingleImage img={img} />
      </div>
    </div>}
  </>)

}

export default SingleImageModal
