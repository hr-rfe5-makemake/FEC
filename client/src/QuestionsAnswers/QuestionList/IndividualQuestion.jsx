import React from 'react'
import Answer from './Answer.jsx'
import axios from 'axios'

class Question extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      renderAnswers: [],
      allAnswers: [],
      defaultAnswers: [],
      alreadyVoted: false,
      userAlreadyReported: false
    }
  }

  answersFetcher(){
    axios.get(`/api/fec2/hr-rfe/qa/questions/${this.props.question.question_id}/answers`)
    .then(response => {
      let result = []
      let seller = []
      for(let x =0; x < response.data.results.length; x++){
        if(response.data.results[x].answerer_name === 'Seller'){
          seller.push(response.data.results[x])
        } else {
          result.push(response.data.results[x])
        }
      }
      let sortedArray = [...seller, ...result]
      if(sortedArray.length === 0){
        this.setState({
          allAnswers: [],
          defaultAnswers: [],
          renderAnswers: []
        })
      } else {
        if(sortedArray.length === 1){
          this.setState({
            allAnswers: sortedArray,
            defaultAnswers: [sortedArray[0]],
            renderAnswers: [sortedArray[0]]
          })
        } else {
          this.setState({
            allAnswers: sortedArray,
            defaultAnswers: [sortedArray[0],sortedArray[1]],
            renderAnswers: [sortedArray[0],sortedArray[1]]
          })
        }
      }
    })
  }

  componentDidMount(){
    this.answersFetcher();
  }

  helpfulUpdater(e){
    e.preventDefault()
    if(!this.state.alreadyVoted){
      axios.put(`/api/fec2/hr-rfe/qa/questions/${this.props.question.question_id}/helpful`)
      .then(repsonse => {
        this.props.updateQuestions()
        this.setState({alreadyVoted: true})
      })
      .catch(err => console.log(err))
    } else {
      alert('Already voted!')
    }
  }

  reportQuesiton(e){
    e.preventDefault()
    if(!this.state.userAlreadyReported){
      axios.put(`/api/fec2/hr-rfe/qa/questions/${this.props.question.question_id}/report`)
      .then(response => {
        e.target.innerText = 'Reported'
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      alert('You already reported relax!!')
    }
  }

  answerClickHandler(){
    let modal = document.getElementsByClassName('answer_Question')[0]
    let display = modal.style.display
    modal.style.display = display === 'none' ? 'block' : 'none'

  }

  render(){
    let loadMoreAnswersStyle = {
      cursor: 'pointer',
      display: this.state.allAnswers.length > 2 ? 'block' : 'none'
    }

    return (
      <li className="question_entry">
        <span className="question">Q: {this.props.question.question_body}</span>
        <span className="question_Rating/Add"> Helpful? <u onClick={this.helpfulUpdater.bind(this)} style={{cursor: 'pointer'}}>Yes</u>({this.props.question.question_helpfulness}) | <u style={{cursor: 'pointer'}} onClick={this.answerClickHandler.bind(this)}>Add Answer</u> | <u onClick={this.reportQuesiton.bind(this)} style={{cursor: 'pointer'}} >Report</u></span>
        <ul>
          {
            this.state.renderAnswers.map((answer, index) => (
              <Answer key={answer.answer_id} answer={answer} updateQuestions={this.props.updateQuestions} updateAnswers={this.answersFetcher.bind(this)} index={index}/>
            ))
          }
        </ul>
        <p style={loadMoreAnswersStyle}>Load More Answers</p>
      </li>
    )
  }

}

export default Question