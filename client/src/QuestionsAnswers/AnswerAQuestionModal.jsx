import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class AnswerAQuestionModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      display: false,
      answer: '',
      username: '',
      email: '',
      photos: [],
      currentImageLink: ''
    }
  }

  newAnswerSubmit(e){
    e.preventDefault()
    if(this.state.answer !== '' && this.state.username !== '' && this.state.email !== ''){
      axios.post(`/api/fec2/hr-rfe/qa/questions/${this.props.questionID}/answers`, {
        body: this.state.answer,
        name: this.state.username,
        email: this.state.email,
        photos: this.state.photos
      })
      .then(repsonse => console.log(repsonse))
      .catch(err => console.log(err.response))
    } else {
      alert(`Please don't leave any fields empty`)
    }
  }

  addImage(){
    if(this.state.photos.length === 4){
      this.setState({
        photos: [...this.state.photos, this.state.currentImageLink]
      })
      document.querySelector('.addImageButton').style.display = 'none'
      document.querySelector('.imageLink').style.display = 'none'
      document.querySelector('.upload-pic-label').innerText = 'You uploaded 5 images'
    } else {
      this.setState({
        photos: [...this.state.photos, this.state.currentImageLink]
      })
      document.querySelector('.imageLink').value = ''
    }
  }

  render() {
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
        <button onClick={this.props.closeModal.bind(this)}> X </button>
        <div className="answerQuestion" style={content}>
            <h1>Submit your Answer</h1>
            <h2>{this.props.product.name} => {this.props.question}</h2>
            <form onSubmit={this.newAnswerSubmit.bind(this)}>
              <label>
                *Your Answer:
                <input type='text' onChange={e => this.setState({answer: e.target.value})} maxLength='1000' required ></input>
              </label><br />
              <label>
                *What is your nickname:
                <input type='text' onChange={e => this.setState({username: e.target.value})} maxLength='60' required placeholder='Example: jackson11!'></input>
                For privacy reasons, do not use your full name or email address
              </label><br />
              <label>
                *Your email:
                <input type='email' onChange={e => this.setState({email: e.target.value})} maxLength='60' required placeholder='Example: jack@email.com'></input>
                For authentication reasons, you will not be emailed
              </label><br />
              <label className='upload-pic-label'>
                  Upload Pictures:
                  <input onChange={e => this.setState({currentImageLink: e.target.value})} className='imageLink' type='text' placeholder='Link to a image'></input><button type='button' className='addImageButton' onClick={this.addImage.bind(this)}>Add Image</button>
              </label><br />
              <div className='user-uploaded-images'>
                {this.state.photos.map(image => (
                  <img src={image} height='50px' width='50px'></img>
                ))}
              </div>
              <button type='submit'>Submit Question</button>
            </form>

        </div>
      </div>
    )
  }

}

export default AnswerAQuestionModal