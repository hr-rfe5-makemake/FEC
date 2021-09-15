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
      email: ''
    }
  }

  newAnswerSubmit(e){
    e.preventDefault()
    console.log(this.state)
    if(this.state.answer !== '' && this.state.username !== '' && this.state.email !== ''){
      axios.post(`/api/fec2/hr-rfe/qa/questions/${this.props.productID}/answers`, {
        body: this.state.answer,
        name: this.state.username,
        email: this.state.email
        // photo:
      })
      .then(repsonse => console.log(repsonse))
      .catch(err => console.log(err))
    } else {
      alert(`Please don't leave any fields empty`)
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
            <form onSubmit={this.newAnswerSubmit.bind(this)}>
              <label>
                *Your Answer:
                <input type='text' onChange={e => this.setState({answer: e.target.value})}></input>
              </label><br />
              <label>
                *What is your nickname:
                <input type='text' onChange={e => this.setState({username: e.target.value})}></input>
                Example: jackson11!
              </label><br />
              <label>
                *Your email:
                <input type='text' onChange={e => this.setState({email: e.target.value})}></input>
                For authentication reasons, you will not be emailed
              </label><br />
              <button type='submit'>Submit Question</button>
            </form>

        </div>
      </div>
    )
  }

}

export default AnswerAQuestionModal