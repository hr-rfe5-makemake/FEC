import React from 'react'
import Axios from 'axios'

class AddAQuestionModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      display: false,
      question: '',
      username: '',
      email: ''
    }
  }


  closeModal(){
      let modal = document.getElementsByClassName('questionModalBackground')[0]
      let display = modal.style.display
      modal.style.display = 'none'
    }

  newQuestionSubmit(e){
    e.preventDefault()
    if(this.state.question !== '' && this.state.username !== '' && this.state.email !== ''){
      Axios.post('/api/fec2/hr-rfe/qa/questions',{
        body: this.state.question,
        name: this.state.username,
        email: this.state.email,
        product_id: this.props.product_id
      })
      .then(response => {
        console.log(response)
        window.location.reload()
      })
      .catch(err => {
        console.log(err.response)
      })
    } else {
      alert(`Please don't leave any fields empty`)
    }

  }

  handleBackgroundClick(event){
    if(event.target.className.includes('modalBackground')){
      this.closeModal()
    }
  }

  render(){
    return(
      <div className='modalBackground questionModalBackground' onClick={this.handleBackgroundClick.bind(this)}>
        <div className="modalContent addQuestionModalContent">
            <button onClick={this.closeModal} className='closeModal-BTN'><i className="fas fa-times"></i></button>
            <div className='addQuestion-header'>
              <div></div>
              <h1>Ask Your Question</h1>
              <h2><i className="fas fa-tshirt"></i>About the {this.props.product}</h2>
            </div>
            <form onSubmit={this.newQuestionSubmit.bind(this)}>
              <div className='modal_question'>
                <label><span className='redstar'>*</span>Your Question:</label>
                <textarea className='modal_textarea'type='text' onChange={e => this.setState({question: e.target.value})} maxLength='1000' required></textarea>
              </div>
              <div className='modal_nickname'>
                <label><span className='redstar'>*</span>Your nickname:</label>
                <div>
                  <input className='modal_input' type='text' onChange={e => this.setState({username: e.target.value})} maxLength='60'
                  placeholder='Example: jackson11!' required></input>
                  <div className='modal_sub'>“For privacy reasons, do not use your full name or email address”</div>
                </div>
              </div>
              <div className='modal_email'>
                <label><span className='redstar'>*</span>Your email:</label>
                <div>
                  <input className='modal_input' type='email' onChange={e => this.setState({email: e.target.value})} maxLength='60' placeholder='Why did you like the product or not?' required></input>
                  <div className='modal_sub'>For authentication reasons, you will not be emailed</div>
                </div>
              </div>
              <div className='modal_btn'>
                <button type='submit'>submit</button>
              </div>
            </form>
        </div>
      </div>
    )
  }

}

export default AddAQuestionModal