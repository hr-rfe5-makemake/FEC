import React from 'react'

const QuestionBody = (props) => {
  if(!props.question.startOfWord && !props.question.searchTerm){
    return <p>{props.question.question_body}</p>
  } else {
    return <p><span>{props.question.question_body.slice(0, props.question.startOfWord)}</span><span style={{backgroundColor: 'yellow'}}>{props.question.question_body.slice(props.question.startOfWord, (props.question.searchTerm + props.question.startOfWord))}</span><span>{props.question.question_body.slice(props.question.startOfWord + props.question.searchTerm)}</span></p>
  }
}

export default QuestionBody