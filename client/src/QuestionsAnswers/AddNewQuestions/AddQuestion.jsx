import React from 'react'
import AddAQuestionModal from './AddQuestionModal.jsx'

class AddAQuestion extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
    //test
  handleButtonClick(e){
    e.preventDefault();
    let modal = document.getElementsByClassName('questionModalBackground')[0]
    let display = modal.style.display
    modal.style.display = 'block'
  }

  render(){
    return(
      <button onClick={this.handleButtonClick.bind(this)}>ADD A QUESTION +</button>
    )

  }

}

export default AddAQuestion