import React from 'react';
import axios from 'axios'
import IndividualQuestion from './QuestionList/IndividualQuestion.jsx'


class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultQuestions: [],
      allQuestions: []
    }
  }

  questionsFetcher(){
    axios.get('/api/fec2/hr-rfe/qa/questions/?product_id=37311&count=4')
      .then(data => {
        this.setState({
          defaultQuestions: data.data.results
        })
      })
    axios.get('/api/fec2/hr-rfe/qa/questions/?product_id=37311')
      .then(data => {
        this.setState({
          allQuestions: data.data.results
        })
      })
  }

  componentDidMount(){
    this.questionsFetcher()
  }

  render(){
    const moreQuestionsStyle={
      display: this.state.allQuestions.length > 4 ? 'block' : 'none'
    }

    return(
      <div>
        Questions & Answers
        {this.state.defaultQuestions.map(question => (
          <IndividualQuestion question= {question} key={question.question_id} updateQuestions={this.questionsFetcher.bind(this)}/>
        ))}
        <button style={moreQuestionsStyle} className='moreQuestions'>More Answered Questions</button>
      </div>
    )
  }
}

export default QuestionsAnswers