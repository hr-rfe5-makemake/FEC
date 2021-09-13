import React from 'react';

class WriteReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>WRITE REVIEW MODAL COMPONENT</div>
        <h4>Write Your Review</h4>
        <h5>About the [Product Name Here]</h5>
        <form>
          <input
            name="Overall Rating"
            type="text"
            value="1, 2, 3, 4, 5 (star icons)"
          />
          <input
            name="Do you recommend this product?"
            type="text"
            value="yes, no"
          />
          <input
            name="Characteristics - 1"
            type="radio"
            value="1, 2, 3, 4, 5"
          />
          <input
            name="Review Summary (optional)"
            type="text"
            value="Placeholder = 'Example: Best purchase ever!'"
          />
          <input
            name="Review Body"
            type="text"
            value="Placeholder = 'Why did you like the product or not?' --> include character counter below"
          />
          <button>Upload your photos</button>
          <input
            name="what is your nickname?"
          />
          <input
            name="Your email"
          />
          <button>Submit Review</button>
        </form>
      </div>
    );
  }
}

export default WriteReviewModal;