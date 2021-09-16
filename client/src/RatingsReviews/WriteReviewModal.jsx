import React from 'react';
import StarSelector from './ModalFormHelpers/StarSelector.jsx';
import Characteristics from './ModalFormHelpers/Characteristics.jsx';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';

class WriteReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: 0,
      recommend: null,
      summary: '',
      body: '',
      nickname: '',
      email: '',
      photos: [],
      characteristics: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCharChange = this.handleCharChange.bind(this);
  }

  handleSubmit() {
    var data = {
      "product_id": 37314,
      "rating": 5,
      "summary": this.state.summary,
      "body": this.state.body,
      "recommend": Boolean(this.state.recommend),
      "name": this.state.nickname,
      "email": this.state.email,
      "photos": [],
      "characteristics": {}
  }
    axios.post(`${urlFragment}reviews`, data)
      .then(data => {
        console.log('success!!:', data)
        this.props.toggleModal();
        this.props.getAllReviews(this.props.product_id);
        this.props.timeToReRender();
      })
      .catch(err => console.error(err))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value || e.target.alt
    });
  }

  handleCharChange(newCharacteristics) {
    console.log('handleCharChange')
    // this.setState({
    //   characteristics: newCharacteristics
    // });
  }

  render() {
    var bodyCounter;
    if (this.state.body.length >= 50) {
      bodyCounter = <div id="bodyCount"><i>Minimum reached</i></div>
    } else {
      bodyCounter = <div id="bodyCount"><i>Minimum required characters left: {50 - this.state.body.length}</i></div>;
    }

    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" onClick={this.props.toggleModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Write Your Review</h4>
            <h5 className="modal-subtitle">About the <i>{this.props.productName}</i></h5>
          </div>
          <div className="modal-body">
            <form id="modal-form" onSubmit={this.handleSubmit}>
              <StarSelector starRating={this.state.starRating} handleChange={this.handleChange}/>
              <div id="recommendRadio" onChange={this.handleChange}>
                Do you recommend this product?<span style={{color: "red"}}>*</span>
                <input type="radio" value="true" name="recommend" required/>Yes
                <input type="radio" value="false" name="recommend" required/>No
              </div>
              <Characteristics
                handleCharChange={this.handleCharChange}
                characteristics={this.state.characteristics}
                product_id={this.props.product_id}
              />
              <label> Review summary (optional){'  '}
                <input type="text" name="summary" value={this.state.summary} onChange={this.handleChange} placeholder={"Example: Best purchase ever!"} style={{width: "250px"}} maxLength="60"/>
              </label>
              <br></br>
              <label> Review body<span style={{color: "red"}}>*</span>{'  '}
                <input type="text" name="body" value={this.state.body} onChange={this.handleChange} placeholder={"Why did you like the product or not?"} style={{width: "250px"}} maxLength="1000" minLength="50" required/>
                {bodyCounter}
              </label>
            {/* <div id="image-upload">
              Select image to upload:<input type="file" name="fileToUpload" id="fileToUpload"/>
            </div> */}
              <label> What is your nickname?<span style={{color: "red"}}>*</span>{'  '}
                <input type="text" name="nickname" value={this.state.nickname} onChange={this.handleChange} placeholder={"Example: jackson11"} style={{width: "250px"}} maxLength="60" required/> <div><i>For privacy reasons, do not use your full name or email address</i></div>
              </label>
              <label>Your email<span style={{color: "red"}}>*</span>{'  '}
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder={"Example: jackson11@email.com"} style={{width: "250px"}} maxLength="60" required/> <div><i>For authentication reasons, you will not be emailed</i></div>
              </label>
            </form>
          </div>
          <div className="modal-footer">
            <input type="submit" value="Submit Review" name="submit" onClick={this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }

}

export default WriteReviewModal;