import React from 'react'

class SearchQuestion extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  userSearched(event){
    this.setState({
      searchTerm: event.target.value
    })
    if(this.state.searchTerm.length >= 3){
      let result = this.props.questions.filter(question => {
        if(question.question_body.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
          return question
        }
      })
      this.props.changeRenderArray(result, true ,this.props.questions.length)
    } else if (this.state.searchTerm.length < 3) {
      this.props.changeRenderArray(this.props.questions, false,this.props.oldLength)
    }
  }

  render(){
    const  inputStyle={
      display: "block"
    }

    return(
      <input style={inputStyle} type='text' onChange={this.userSearched.bind(this)} placeholder='Have a question? Search for answers…'></input>
    )
  }

}

export default SearchQuestion