import React from 'react'

class AnswerAQuestion extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      display: false
    }
  }

  render(){
    const modalStyle={
      backgroundColor: "gray",
      display: 'none'
    }

    return(
      <div className="answer_Question" style={modalStyle}>
          <h4>Answer the question</h4>
      </div>
    )
  }

}

export default AnswerAQuestion