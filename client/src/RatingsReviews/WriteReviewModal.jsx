import React from 'react';

function WriteReviewModal({show, toggleModal, productName}) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Write Your Review</h4>
          <h5 className="modal-subtitle">About the <i>{productName}</i></h5>
        </div>
        <div className="modal-body">
          This is modal content
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={toggleModal}>Close</button>
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

export default WriteReviewModal;