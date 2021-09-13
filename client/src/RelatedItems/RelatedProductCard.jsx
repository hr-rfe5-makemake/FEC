import React from "react";
import axios from "axios";

class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null
    }
    this.fetch = this.fetch.bind(this);
    this.compare = this.compare.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/api/fec2/hr-rfe/products/" + this.props.item.id + "/styles")
      .then((result) => {
        var styles = result.data.results;
        for (var i = 0; i < styles.length; i++) {
          if (styles[i]["default?"] === true) {
            var idx = i;
          }
        }
        console.log(styles[idx].photos);
        // MIGHT HAVE TO FIX THIS LATER BECAUSE FETCH AUTOMATICALLY CHANGES TO TRUE BEFORE FINISHING ALL FETCHES
        this.setState({
          img: styles[idx].photos[0].thumbnail_url,
        });
      })
      .catch((err) => {
        console.log("error");
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item.id !== this.props.item.id) {
        console.log(this.props.item.id);
        axios
        .get("/api/fec2/hr-rfe/products/" + this.props.item.id + "/styles")
        .then((result) => {
          var styles = result.data.results;
          // set default idx to 0
          var idx = 0;
          for (var i = 0; i < styles.length; i++) {
            if (styles[i]["default?"] === true) {
              idx = i;
            }
          }
          console.log(styles[idx]);
          // MIGHT HAVE TO FIX THIS LATER BECAUSE FETCH AUTOMATICALLY CHANGES TO TRUE BEFORE FINISHING ALL FETCHES
          this.setState({
            img: styles[idx].photos[0].thumbnail_url,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  fetch() {
    axios
      .get("/api/fec2/hr-rfe/products/" + this.props.item.id + "/styles")
      .then((result) => {
        var styles = result.data.results;
        for (var i = 0; i < styles.length; i++) {
          if (styles[i]["default?"] === true) {
            var idx = i;
          }
        }
        console.log(styles[idx].photos);
        // MIGHT HAVE TO FIX THIS LATER BECAUSE FETCH AUTOMATICALLY CHANGES TO TRUE BEFORE FINISHING ALL FETCHES
        this.setState({
          img: styles[idx].photos[0].thumbnail_url,
        });
      })
      .catch((err) => {
        console.log("error");
      });
  }

  compare() {}

  render() {
    return Object.keys(this.props.item).length !== 0 ? (
      <div className='productCard'>
        <div className='productImage'>
          <img src ={this.state.img} alt='Photo' />
        </div>
        <div className='productCategory'>Category: {this.props.item.category}</div>
        <div className='productName'>Name: {this.props.item.name}</div>
        <div className='productPrice'>Price: {this.props.item.default_price}</div>
        {this.props.item.rating ? (
          <div className='productRating'>Rating: {this.props.item.rating}</div>
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
