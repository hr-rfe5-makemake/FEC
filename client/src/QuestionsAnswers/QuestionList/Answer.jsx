import React from 'react'
import dateFormat from 'dateformat'
import axios from 'axios'
import AnswerImages from './AnswerImages.jsx'

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
        this.setState({userMarkedAnswerAsHelpful: true})
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
        <li>
          <span>A:{this.props.answer.body}</span>
          <div>
            <span>by <span style={nameStyle}>{this.props.answer.answerer_name}</span>, {dateFormat(this.props.answer.date, 'mmmm d, yyyy')} |
            Helpful? <u onClick={this.helpfulUpdater.bind(this)} style={{cursor: 'pointer'}}>Yes</u>({this.props.answer.helpfulness}) | <u onClick={this.report.bind(this)} style={{cursor: 'pointer'}}>Report</u> </span>
          </div>
          <div className='answer-images'>
            {this.props.answer.photos.map(photo => (
              <AnswerImages photo={photo} key={photo.id}/>
            ))}
          </div>
        </li>
      )

  }

}

export default Answer

