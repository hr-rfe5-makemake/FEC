import React from 'react';


class RelatedProductRating extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var output = '';
    var rating = this.props.rating;
    while (rating >= 0) {

      if (rating >= 1) {
        output += '<img src="star.png"/>';
      }
      rating -= 1

    }
    return (
      <div>
      Rating: {output}
      </div>
    )
  }


}

export default RelatedProductRating;