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
      characteristics: {},
      errorsExist: false,
      errors: [<div id="rr-error-header" className="rr-error">{'Errors:'}</div>]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.handleCharChange = this.handleCharChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  // Render error messages, if there are any
  handleErrors() {
    // If there are no errors, return null
    if (this.state.errors.length === 1) {
      return null;
    // Otherwise, return a div of error messages
    } else {
      var errorMessages = [];
      for (var i = 0; i < this.state.errors.length; i++) {
        errorMessages.push(this.state.errors[i]);
      }
      return <div key={"rr-error-container"} id="rr-error-container">{errorMessages}</div>;
    }
  }

  // Check for errors and then make a POST request when the "Add a Review" form is submitted
  handleSubmit() {
    // reset errors array (it may contain errors from previous incorrect submissions)
    this.setState({
      errors: [<div id="rr-error-header" className="rr-error">{'Errors:'}</div>],
      errorsExist: false
    }, () => {
      var data = {
        "product_id": this.props.product_id,
        "rating": parseInt(this.state.starRating),
        "summary": this.state.summary,
        "body": this.state.body,
        "recommend": Boolean(this.state.recommend),
        "name": this.state.nickname,
        "email": this.state.email,
        "photos": this.state.photos,
        "characteristics": this.state.characteristics
      }

      // if any mandatory fields are blank
      if (data.rating === 0 || Object.keys(data.characteristics).length === 0 || data.body === '' || data.name === '' || data.email === '') {
        this.state.errors.push(<li key="1" className="rr-error" >{'Please complete all mandatory fields'}</li>);
      }

      // if the review body is < 50 characters
      if (data.body.length < 50) {
        this.state.errors.push(<li key="2" className="rr-error" >{'Body does not meet minimum length requirement'}</li>);
      }

      // if the email address is not in the correct format
      if (data.email.indexOf('@') === -1) {
        this.state.errors.push(<li key="3" className="rr-error" >{'Email is not in the proper format'}</li>);
      }

      // if there are any error messages, update state which renders those messages
      if (this.state.errors.length > 1) {
        this.setState({
          errorsExist: true
        });

      // otherwise, make the POST request
      } else {
        axios.post(`${urlFragment}reviews`, data)
          .then(data => {
            this.props.toggleModal();
            this.props.getAllReviews(this.props.product_id);
            this.props.timeToReRender();
            this.props.addComplete();
          })
          .catch(err => console.error(err))
        }
    })
  }

  // When form inputs change, update the corresponding state variables
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value || e.target.alt
    });
  }

  // When a characteristic is rated, store that characteristic's ID and rating in the characteristics object in state.
  // The POST request requires characteristic data to be stored in this format.
  handleCharChange(e) {
    var charId = e.target.name;
    var charValue = parseInt(e.target.value);
    var characteristics = this.state.characteristics;
    characteristics[charId] = charValue;
    this.setState({
      characteristics: characteristics
    });
  }

  // Render the "Add Image" input
  addAnImage() {
    // If there are no images yet, return a message, input field, and add button
    if (!this.state.photos.length) {
      return (
      <div className={"rr-summary-body"}>
        <div>Add up to 5 images:</div>
        <div>
          <input type="text" value={this.state.currImageValue} id="image-input" placeholder="Paste URL here"/>
          <button id="addImageBtn" onClick={this.handleImageChange}>Add</button>
        </div>
      </div>)
    // If there are less than 5 images, return a message, input field, add button, and current thumbnails
    } else if (this.state.photos.length < 5) {
      var images = [];
      for (var i = 0; i < this.state.photos.length; i++) {
        images.push(<img src={this.state.photos[i]} style={{height: "auto", width: "15%"}}></img>);
      }
      return (
        <div className={"rr-summary-body"}>
          <div>Add up to 5 images:</div>
          <div>
            <input type="text" value={this.state.currImageValue} id="image-input" placeholder="Paste URL here"/>
            <button id="addImageBtn" onClick={this.handleImageChange}>Add</button>
            <div id="imageContainer" style={{display: "flex", gap: "10px"}}>{images}</div>
          </div>
        </div>)
    // If 5 images have already been added, return a new message and the 5 thumbnails
    } else {
      var images = [];
      for (var i = 0; i < this.state.photos.length; i++) {
        images.push(<img src={this.state.photos[i]} style={{height: "auto", width: "15%"}}></img>);
      }
      return (
        <div className={"rr-summary-body"}>
          <div>5 images added</div>
          <div id="imageContainer" style={{display: "flex", gap: "10px"}}>{images}</div>
        </div>)
    }
  }

  // When a new image URL is added to the form, push it into the photo array in state
  handleImageChange(e) {
    var input = document.getElementById("image-input")
    var photos = this.state.photos;
    photos.push(input.value);
    this.setState({
      photos: photos
    });
  }

  render() {
    // Count the number of characters in the body field and render the appropriate message
    var bodyCounter;
    if (this.state.body.length >= 50) {
      bodyCounter = <div id="bodyCount"><i>Minimum reached</i></div>
    } else {
      bodyCounter = <div id="bodyCount"><i>Minimum required characters left: {50 - this.state.body.length}</i></div>;
    }

    // Don't show the modal if ReviewList says not to
    if (!this.props.show) {
      return null;
    }
    // Otherwise, return the modal
    return (
      <div className="modal" onClick={this.props.toggleModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Write Your Review</h2>
            <h3 className="modal-subtitle">About the <i>{this.props.productName}</i></h3>
          </div>
          <div className="modal-body">
            <form id="modal-form" onSubmit={this.handleSubmit}>
              <StarSelector starRating={this.state.starRating} handleChange={this.handleChange}/>
              <div id="recommendRadio" onChange={this.handleChange}>
                <div id="recommendQ">Do you recommend this product?<span style={{color: "red"}}>*</span></div>
                <div><input type="radio" value="true" name="recommend" required/>Yes</div>
               <div><input type="radio" value="false" name="recommend" required/>No</div>
              </div>
              <Characteristics
                handleCharChange={this.handleCharChange}
                characteristics={this.state.characteristics}
                product_id={this.props.product_id}
              />
              <div id="rr-bottom-form">
              <div className="rr-summary-body">
                <label className="rr-label"> Review summary (optional)</label>
                <input type="text" name="summary" value={this.state.summary} onChange={this.handleChange} placeholder={"Example: Best purchase ever!"} style={{width: "250px"}} maxLength="60"/>
              </div>
              <div className="rr-summary-body">
                <label className="rr-label"> Review body<span style={{color: "red"}}>*</span></label>
                <div>
                  <textarea name="body" value={this.state.body} onChange={this.handleChange} placeholder={"Why did you like the product or not?"} style={{width: "90%", fontFamily: "Lato, sans-serif"}} maxLength="1000" minLength="50" required></textarea>
                  {bodyCounter}
                </div>
              </div>
              {this.addAnImage()}
              <div className="rr-summary-body">
                <label> What is your nickname?<span style={{color: "red"}}>*</span></label>
                <div>
                <input type="text" name="nickname" value={this.state.nickname} onChange={this.handleChange} placeholder={"Example: jackson11"} style={{width: "250px"}} maxLength="60" required/>
                <i style={{display: 'block'}}>For privacy reasons, do not use your full name or email address</i>
                </div>
              </div>
              <div className="rr-summary-body">
                <label>Your email<span style={{color: "red"}}>*</span></label>
                <div><input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder={"Example: jackson11@email.com"} style={{width: "250px"}} maxLength="60" required/><i style={{display: 'block'}}>For authentication reasons, you will not be emailed</i></div>
              </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            {this.state.errorsExist ? this.handleErrors() : null}
            <input className={"rr-button"} type="submit" value="Submit Review" name="submit" id="modal-submit" onClick={this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }

}

export default WriteReviewModal;