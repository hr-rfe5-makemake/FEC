import React from 'react'
import Answer from './Answer.jsx'
import axios from 'axios'

class Question extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      answers: []
    }
  }

  answersFetcher(){
    axios.get(`/api/fec2/hr-rfe/qa/questions/${this.props.question.question_id}/answers?count=2`)
    .then(response => {
      this.setState({answers: response.data.results})
    })
  }

  componentDidMount(){
    this.answersFetcher();
  }

  helpfulUpdater(e){
    e.preventDefault()
    axios.put(`/api/fec2/hr-rfe/qa/questions/${this.props.question.question_id}/helpful`)
    .then(repsonse => {
      this.props.updateQuestions()
    })
    .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="question_entry">
        <span className="question">Q: {this.props.question.question_body}</span>
        <span className="question_Rating/Add"> Helpful? <a onClick={this.helpfulUpdater.bind(this)}><u>Yes</u>({this.props.question.question_helpfulness})</a> | <a><u>Add Answer</u></a> | <a><u>Report</u></a></span>
        {
          this.state.answers.map(answer => (
            <Answer key={answer.answer_id} answer={answer} updateQuestions={this.props.updateQuestions} updateAnswers={this.answersFetcher.bind(this)}/>
          ))
        }
      </div>
    )
  }

}

export default Question