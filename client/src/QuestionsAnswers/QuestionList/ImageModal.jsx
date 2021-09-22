import React from 'react'

const ImageModal = (props) => {
  return(
    <div className='imageModal' onClick={props.closeModal}>
      <div className='imageModal_Content'>
          <img src={props.url} maxHeight='auto' maxWidth='auto'></img>
      </div>
    </div>
  )

}

export default ImageModal