import React from 'react';
import axios from 'axios'
import IndividualQuestion from './QuestionList/IndividualQuestion.jsx'
import AddAQuestion from './AddNewQuestions/AddQuestion.jsx'
import AddQuestionModal from './AddNewQuestions/AddQuestionModal.jsx'
import AnswerAQuestion from './AnswerAQuestionModal.jsx'
import SearchQuestion from './SearchQuestions/SearchQuestions.jsx'

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuestions: [],
      renderQuestions: [],
      questionsRendered: 2,
      oldQuestionsRendered: 2,
      renderedAllQuestion: false,
      product_name: ''
    }
  }

  questionsFetcher(){
    axios.get('/api/fec2/hr-rfe/qa/questions/?product_id=37311&count=10')
      .then(data => {
        let questions = data.data.results;
        if (questions.length <= 2) {
          this.setState({
            allQuestions: questions,
            renderQuestions: questions,
            renderedAllQuestion: true
          })
        } else {
          this.setState({
            allQuestions: questions,
            renderQuestions: questions
          })
        }

      })
  }

  componentDidMount(){
    this.questionsFetcher()
      axios.get(`/api/fec2/hr-rfe/products/${37311}`)
      .then(response => {
        this.setState({
          product_name: response.data.name
        })
      })

  }

  loadMoreQuestions(){
    if(this.state.questionsRendered+2 >= this.state.allQuestions.length){
      this.setState({
        questionsRendered: this.state.questionsRendered+=2,
        oldQuestionsRendered:this.state.oldQuestionsRendered += 2,
        renderedAllQuestion: true
      })
    } else {
      this.setState({
        questionsRendered: this.state.questionsRendered+=2,
        oldQuestionsRendered: this.state.oldQuestionsRendered+=2
      })
    }

  }

  changeRenderArray(arr, isValid ,length){
    if(isValid){
      this.setState({
        renderQuestions: arr,
        questionsRendered: length

      })
    } else {
      this.setState({
        renderQuestions: arr,
        questionsRendered: length
      })
    }
  }

  render(){
    const moreQuestionsStyle={
      display: !this.state.renderedAllQuestion ? 'block' : 'none'
    }
    const scroll = {
      overflow:"scroll",
      maxHeight: '70vh'
    }

    return(
      <div className='questions_answers'>
        Questions & Answers
        <SearchQuestion questions={this.state.allQuestions} oldLength={this.state.oldQuestionsRendered} changeRenderArray={this.changeRenderArray.bind(this)}/>
        <AddQuestionModal product={this.state.product_name} product_id={37311}/>
        <div className='modal-placeHolder'></div>
        <ul style={scroll}>
          {this.state.renderQuestions.slice(0,this.state.questionsRendered).map((question,index) => (
            <IndividualQuestion question= {question} key={question.question_id} updateQuestions={this.questionsFetcher.bind(this)} index={index} product={this.state.product_name}/>
          ))}
        </ul>
        <button style={moreQuestionsStyle} onClick={this.loadMoreQuestions.bind(this)} className='moreQuestions'>More Answered Questions</button>
        <AddAQuestion />
      </div>
    )
  }
}

export default QuestionsAnswers