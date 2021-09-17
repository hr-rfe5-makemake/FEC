import React from 'react'

const ImageModal = (props) => {

  const content={
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }

  const answerBackGround = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'

  }

  return(
    <div id='answerQuestionBackGround' style={answerBackGround} >
      <button onClick={props.closeModal}> X </button>
      <div className="answerQuestion" style={content}>
          <img src={props.url} height='250' width='425'></img>
      </div>
    </div>
  )

}

export default ImageModal