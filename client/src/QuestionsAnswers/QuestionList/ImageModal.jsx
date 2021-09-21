import React from 'react'

const ImageModal = (props) => {

  const answerBackGround={
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


  // const answerBackGround = {
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0
  // }

  return(
    <div id='answerQuestionBackGround' style={answerBackGround} onClick={props.closeModal}>
      <div>
          <img src={props.url} height='auto' width='auto'></img>
      </div>
    </div>
  )

}

export default ImageModal