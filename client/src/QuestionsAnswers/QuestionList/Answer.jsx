import React from 'react'
import dateFormat from 'dateformat'
import axios from 'axios'

class Answer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userMarkedAnswerAsHelpful: false,
      userReportedAnswer: false
    }
  }

  helpfulUpdater(e){
    e.preventDefault()
    if(!this.state.userMarkedAnswerAsHelpful){
      axios.put(`/api/fec2/hr-rfe/qa/answers/${this.props.answer.answer_id}/helpful`)
      .then(response => {
        this.state.userMarkedAnswerAsHelpful = true
        console.log(response)
        this.props.updateAnswers()
      })
      .catch(err => {
        console.log(err.response)
      })
    } else {
      alert('You have already voted')
    }

  }

  report(e){
    e.preventDefault()
    axios.put(`/api/fec2/hr-rfe/qa/answers/${this.props.answer.answer_id}/report`)
    .then(response => {
      e.target.innerText = 'Reported'
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    let nameStyle = {
      fontWeight: this.props.answer.answerer_name === 'Seller' ? 'bold' : 'normal'
    }

    return (
      <div>
        <span>A:{this.props.answer.body}</span>
        <div>
          <span>by <span style={nameStyle}>{this.props.answer.answerer_name}</span>, {dateFormat(this.props.answer.date, 'mmmm d, yyyy')} |
           Helpful? <a onClick={this.helpfulUpdater.bind(this)}><u>Yes</u>({this.props.answer.helpfulness})</a> | <a onClick={this.report.bind(this)}><u>Report</u></a> </span>
        </div>
      </div>
    )
  }

}

export default Answer

