import React from 'react'
import AddAQuestionModal from './AddQuestionModal.jsx'

class AddAQuestion extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  handleButtonClick(e){
    e.preventDefault();
    let modal = document.getElementsByClassName('addQuestionModal')[0]
    let display = modal.style.display
    modal.style.display = display === 'none' ? 'block' : 'none'
  }

  render(){
    return(
      <button onClick={this.handleButtonClick.bind(this)}>Click Me</button>
    )

  }

}

export default AddAQuestion