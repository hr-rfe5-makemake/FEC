import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import config from '/config.js'

class AnswerAQuestionModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      display: false,
      answer: '',
      username: '',
      email: '',
      photos: [],
      currentImageLink: '',
      showButton: true,
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
      .then(repsonse => {
        console.log(repsonse)
        window.location.reload()
      })
      .catch(err => console.log(err.response))
    } else {
      alert(`Please don't leave any fields empty`)
    }
  }

  addImage(event){
    let body = new FormData()
    body.set('key', config.IMGBB)
    body.set('image', event.target.files[0])
    axios.post('https://api.imgbb.com/1/upload', body)
    .then(response => {
      console.log(response.data.data.image.url)
      if(this.state.photos.length === 4){
        this.setState({
          photos: [...this.state.photos, response.data.data.image.url],
          showButton: false
        })
      } else {
        this.setState({
          photos: [...this.state.photos, response.data.data.image.url]
        })
      }
    })
  }

  handleBackgroundClick(event){
    if(event.target.className.includes('modalBackground')){
      this.props.closeModal()
    }
  }


  render() {
    const addImageStyle = {
      display: this.state.showButton ? 'block': 'none'
    }


    return(
      <div className='modalBackground answerQuestionBackGround' onClick={this.handleBackgroundClick.bind(this)}>
        <div className="modalContent answerQuestionContent">
            <button onClick={this.props.closeModal.bind(this)} className='closeModal-BTN'><i className="fas fa-times"></i></button>
            <div className='add-answer-header'>
              <h1>Submit your Answer</h1>
              <h2><i className="fas fa-tshirt"></i>{this.props.product.name} <i className="fas fa-arrow-right"></i> <i className="fas fa-question-circle"></i>{this.props.question}</h2>
            </div>
            <form onSubmit={this.newAnswerSubmit.bind(this)}>
              <div className='modal_question'>
                <label><span className='redstar'>*</span>Your Answer:</label>
                  <textarea className='modal_textarea' type='text' onChange={e => this.setState({answer: e.target.value})} maxLength='1000' required >
                </textarea>
              </div>
              <div className='modal_nickname'>
                <label><span className='redstar'>*</span>What is your nickname:</label>
                  <div>
                    <input className='modal_input' type='text' onChange={e => this.setState({username: e.target.value})} maxLength='60' required placeholder='Example: jackson11!'></input>
                    <div className='modal_sub'>For privacy reasons, do not use your full name or email address</div>
                  </div>
              </div>
              <div className='modal_email'>
                <label><span className='redstar'>*</span>Your email:</label>
                  <div>
                    <input className='modal_input' type='email' onChange={e => this.setState({email: e.target.value})} maxLength='60' required placeholder='Example: jack@email.com'></input>
                    <div className='modal_sub'>For authentication reasons, you will not be emailed</div>
                  </div>
              </div>
              <div className='modal_photos'>
                <label className='upload-pic-label'>{this.state.showButton? 'Upload Pictures' : 'You uploaded 5 images'}</label>
                  <div>
                    <input onChange={this.addImage.bind(this)} className='modal_input' type='file' placeholder='Link to a image' style={addImageStyle}></input>
                  </div>
                  <div className='user-uploaded-images'>
                    {this.state.photos.map(image => (
                      <img src={image} height='100px' width='100px'></img>
                    ))}
                  </div>
              </div>
              <div className='modal_btn'>
                <button type='submit'>Submit Question</button>
              </div>
            </form>

        </div>
      </div>
    )
  }

}

export default AnswerAQuestionModal