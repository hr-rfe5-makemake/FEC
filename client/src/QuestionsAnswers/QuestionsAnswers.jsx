import React from 'react';
import axios from 'axios'
import IndividualQuestion from './QuestionList/IndividualQuestion.jsx'


class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuestions: [],
      defaultQuestions: [],
      questionsRendered: 2,
      renderedAllQuestion: false
    }
  }

  questionsFetcher(){
    axios.get('/api/fec2/hr-rfe/qa/questions/?product_id=37312')
      .then(data => {
        let questions = data.data.results;
        if (questions.length <= 2) {
          this.setState({
            allQuestions: questions,
            defaultQuestions: questions,
            renderedAllQuestion: true
          })
        } else {
          this.setState({
            allQuestions: questions,
            defaultQuestions: [questions[0],questions[1]]
          })
        }

      })
  }

  componentDidMount(){
    this.questionsFetcher()
  }

  loadMoreQuestions(){
    if(this.state.questionsRendered+2 >= this.state.allQuestions.length){
      this.setState({
        questionsRendered: this.state.questionsRendered+=2,
        renderedAllQuestion: true
      })
    } else {
      this.setState({
        questionsRendered: this.state.questionsRendered+=2,
      })
    }

  }

  render(){
    const moreQuestionsStyle={
      display: !this.state.renderedAllQuestion ? 'block' : 'none'
    }

    return(
      <div>
        Questions & Answers
        <ul>
          {this.state.allQuestions.slice(0,this.state.questionsRendered).map((question,index) => (
            <IndividualQuestion question= {question} key={question.question_id} updateQuestions={this.questionsFetcher.bind(this)} index={index}/>
          ))}
        </ul>
        <button style={moreQuestionsStyle} onClick={this.loadMoreQuestions.bind(this)} className='moreQuestions'>More Answered Questions</button>
      </div>
    )
  }
}

export default QuestionsAnswers