import React from 'react';


class RelatedProductRating extends React.Component {
  constructor(props) {
    super(props);
    this.getStars = this.getStars.bind(this);
  }

  // method to convert rating number to an array of html elements of rating images
  getStars(rating) {
    var totalStars = 5;
    var output = [];
    while (rating > 0) {
      if (rating >= 1) {
        output.push(<img key={5-totalStars} src="star.png"/>);
      } else if (rating >= 0.75) {
        output.push(<img key={5-totalStars} src="star-three-quarter.png" />);
      } else if (rating >= 0.5) {
        output.push(<img key={5-totalStars} src="star-half.png" />)
      } else if (rating >= 0.25) {
        output.push(<img key={5-totalStars} src="star-one-quarter.png" />)
      } else {
        break;
      }
      rating -= 1;
      totalStars -= 1;
    }
    for (var i = 0; i < totalStars; i++) {
      output.push(<img key={5-totalStars+i} src="star-empty.png"/>);
    }
    return output
  }

  render() {
    return (
      <div>
      {this.getStars(this.props.rating)}
      </div>
    )
  }


}

export default RelatedProductRating;