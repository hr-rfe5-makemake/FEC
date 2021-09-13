import React from "react";
import axios from "axios";

class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      rating: null,
      styles: {}
    };
  }

  componentDidMount() {
    console.log(this.props.itemId);
    axios
      .get("/api/fec2/hr-rfe/products/" + this.props.itemId)
      .then((result) => {
        this.setState({
          item: result.data,
        });
      })
      .catch((err) => {
        console.log("error");
      });
    axios
      .get("/api/fec2/hr-rfe/reviews/meta?product_id=" + this.props.itemId)
      .then((result) => {
        if (Object.keys(result.data.ratings).length > 0) {
          var totalCount = 0;
          var totalRatings = 0;
          for (var key in result.data.ratings) {
            totalRatings += parseInt(result.data.ratings[key]) * key;
            totalCount += parseInt(result.data.ratings[key]);
          }
          var avgRating = totalRatings / totalCount;
          this.setState({
            rating: avgRating,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .get("/api/fec2/hr-rfe/products/" + this.props.itemId + '/styles')
    //   .then((result) => {
    //     console.log(result.data);
    //     for (key in result.data.styles)
    //     this.setState({
    //       styles: result.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("error");
    //   });
  }

  render() {
    return Object.keys(this.state.item).length !== 0 ? (
      <div className="productCard">
        <div>Category: {this.state.item.category}</div>
        <div>Name: {this.state.item.name}</div>
        <div>Price: {this.state.item.default_price}</div>
        {this.state.rating ? (
          <div>Rating: {this.state.rating}</div>
        ) : (
          <div></div>
        )}
      </div>
    ) : (
      <div></div>
    );
  }
}

export default RelatedProductCard;
