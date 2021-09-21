import React from 'react'

const ImageModal = (props) => {
  return(
    <div className='imageModal' onClick={props.closeModal}>
      <div>
          <img src={props.url} height='auto' width='auto'></img>
      </div>
    </div>
  )

}

export default ImageModal