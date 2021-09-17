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
      })
      .catch(err => {
        console.log(err.response)
      })
    } else {
      alert(`Please don't leave any fields empty`)
    }
  }

  render(){
    const modalStyle={
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

    const modalBackGround = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      display: 'none'

    }

    return(
      <div className='questionModalBackground' style={modalBackGround}>
        <button onClick={this.closeModal}> X </button>
        <div className="addQuestionModal" style={modalStyle}>
            <h4>Ask Your Question</h4>
            <p>About the {this.props.product}</p>
            <form onSubmit={this.newQuestionSubmit.bind(this)}>
              <label>
                *Your Question:
                <textarea type='text' onChange={e => this.setState({question: e.target.value})} maxLength='1000' required></textarea>
              </label><br />
              <label>
                *What is your nickname:
                <input type='text' onChange={e => this.setState({username: e.target.value})} maxLength='60' placeholder='Example: jackson11!' required></input>
                “For privacy reasons, do not use your full name or email address”
              </label><br />
              <label>
                *Your email:
                <input type='email' onChange={e => this.setState({email: e.target.value})} maxLength='60' placeholder='Why did you like the product or not?' required></input>
                For authentication reasons, you will not be emailed
              </label><br />
              <button type='submit'>submit</button>
            </form>
        </div>
      </div>
    )
  }

}

export default AddAQuestionModal