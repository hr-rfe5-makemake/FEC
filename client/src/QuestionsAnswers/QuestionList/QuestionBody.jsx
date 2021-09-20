import React from 'react'

const QuestionBody = (props) => {
  if(!props.question.startOfWord && !props.question.searchTerm){
    return <span>{props.question.question_body}</span>
  } else {
    return <span><span>{props.question.question_body.slice(0, props.question.startOfWord)}</span><span style={{backgroundColor: 'yellow'}}>{props.question.question_body.slice(props.question.startOfWord, props.question.searchTerm-1 + props.question.startOfWord)}</span><span>{props.question.question_body.slice(props.question.startOfWord + props.question.searchTerm-1)}</span></span>
  }
}

export default QuestionBody