import React from 'react'
import Answer from './Answer.jsx'
import axios from 'axios'
import AnswerAQuestionModal from '../AnswerAQuestionModal.jsx'
import ReactDOM from 'react-dom'
import QuestionBody from './QuestionBody.jsx'

class Question extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allAnswers: [],
      renderedAnswers: 2,
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
      this.setState({
        allAnswers: sortedArray
      })
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
    let modalLocation = document.querySelector('.modal-placeHolder')
    ReactDOM.render(<AnswerAQuestionModal questionID={this.props.question.question_id} closeModal={this.closeModal.bind(this)} question={this.props.question.question_body} product={this.props.product}/>, modalLocation)
  }

  closeModal(){
    ReactDOM.unmountComponentAtNode(document.querySelector('.modal-placeHolder'));
  }

  lodaMoreAnswers(e){
    if(e.target.innerText === 'Load More Answers'){
      this.setState({
        renderedAnswers: this.state.allAnswers.length
      })
      event.target.innerText = 'Less Answers'
    } else if(e.target.innerText === 'Less Answers'){
      this.setState({
        renderedAnswers: 2
      })
      e.target.innerText = 'Load More Answers'
    }
  }

  render(){
    let loadMoreAnswersStyle = {
      cursor: 'pointer',
      display: this.state.allAnswers.length > 2 ? 'block' : 'none'
    }


      return (
        <li className="question_entry">
          <span className="question">Q: {<QuestionBody question={this.props.question}/> }</span>
          <span className="question_Rating/Add"> Helpful? <u onClick={this.helpfulUpdater.bind(this)} style={{cursor: 'pointer'}}>Yes</u>({this.props.question.question_helpfulness}) | <u style={{cursor: 'pointer'}} onClick={this.answerClickHandler.bind(this)}>Add Answer</u> | <u onClick={this.reportQuesiton.bind(this)} style={{cursor: 'pointer'}} >Report</u></span>
          <ul>
            {
              this.state.allAnswers.slice(0,this.state.renderedAnswers).map((answer, index) => (
                <Answer key={answer.answer_id} answer={answer} updateQuestions={this.props.updateQuestions} updateAnswers={this.answersFetcher.bind(this)} index={index} />
              ))
            }
          </ul>
          <p style={loadMoreAnswersStyle} onClick={this.lodaMoreAnswers.bind(this)}>Load More Answers</p>
        </li>
      )

  }

}

export default Question