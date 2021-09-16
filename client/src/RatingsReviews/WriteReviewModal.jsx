import React from 'react';
import StarSelector from './ModalFormHelpers/StarSelector.jsx';

class WriteReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: 3
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    //post request
  }

  handleChange(e) {
    console.log(e.target.alt)
    this.setState({
      [e.target.name]: e.target.value || e.target.alt
    });
  }

  render() {
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
            This is modal content
            <form id="modal-form" onSubmit={this.handleSubmit}>
              <StarSelector starRating={this.state.starRating} handleChange={this.handleChange}/>
            </form>
          </div>
          <div className="modal-footer">
            <button className="modal-button" onClick={this.props.toggleModal}>Close</button>
          </div>

        </div>

        {/* <form>
          <input
          name="Overall Rating"
          type="text"
          //value="1, 2, 3, 4, 5 (star icons)"
          />
          <input
          name="Do you recommend this product?"
          type="text"
          //value="yes, no"
          />
          <input
          name="Characteristics - 1"
          type="radio"
          //value="1, 2, 3, 4, 5"
          />
          <input
          name="Review Summary (optional)"
          type="text"
          //value="Placeholder = 'Example: Best purchase ever!'"
          />
          <input
          name="Review Body"
          type="text"
          //value="Placeholder = 'Why did you like the product or not?' --> include character counter below"
          />
          <button>Upload your photos</button>
          <input
          name="what is your nickname?"
          />
          <input
          name="Your email"
          />
          <button>Submit Review</button>
        </form> */}
        </div>
    );
  }

}

export default WriteReviewModal;