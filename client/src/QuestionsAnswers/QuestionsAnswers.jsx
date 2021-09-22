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
      collapseQuesitons: false
    }
  }

  questionsFetcher(){
    axios.get(`/api/fec2/hr-rfe/qa/questions/?product_id=${this.props.product.id}&count=20`)
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
    if(this.props.product.id){
      this.questionsFetcher()
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.product.id !== prevProps.product.id){
      this.questionsFetcher()
    }
  }

  loadMoreQuestions(){
    if(this.state.questionsRendered+2 >= this.state.allQuestions.length){
      this.setState({
        questionsRendered: this.state.questionsRendered+=2,
        oldQuestionsRendered:this.state.oldQuestionsRendered += 2,
        renderedAllQuestion: true,
        collapseQuesitons: true
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

  collapseQuesitons(){
    this.setState({
      questionsRendered: 2,
      oldQuestionsRendered: 2,
      collapseQuesitons: false,
      renderedAllQuestion: false
    })
  }

  render(){
    if(this.props.product){
      const moreQuestionsStyle={
        display: !this.state.renderedAllQuestion ? 'block' : 'none'
      }

      const collapseStyle = {
        display: this.state.collapseQuesitons ? 'block' : 'none'
      }

      return(
        <div className='questions_answers'>
          <h1>Questions & Answers</h1>
          <SearchQuestion questions={this.state.allQuestions} oldLength={this.state.oldQuestionsRendered} changeRenderArray={this.changeRenderArray.bind(this)}/>
          <AddQuestionModal product={this.props.product.name} product_id={this.props.product.id}/>
          <div className='modal-placeHolder'></div>
          <ul className='questionsList'>
            {this.state.renderQuestions.slice(0,this.state.questionsRendered).map((question,index) => (
              <IndividualQuestion question= {question} key={question.question_id} updateQuestions={this.questionsFetcher.bind(this)} index={index} product={this.props.product}/>
            ))}
          </ul>
          <div className='main_buttons'>
            <button style={moreQuestionsStyle} onClick={this.loadMoreQuestions.bind(this)} className='moreQuestions'>MORE ANSWERED QUESTION +</button>
            <button style={collapseStyle} onClick={this.collapseQuesitons.bind(this)}>Collapse Question's</button>
            <AddAQuestion />
          </div>
        </div>
      )
    }
  }
}

export default QuestionsAnswers