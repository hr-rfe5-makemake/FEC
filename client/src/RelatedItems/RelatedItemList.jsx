import React from "react";
import axios from "axios";
import RelatedProductCard from "./RelatedProductCard.jsx";
import _ from "underscore";

class RelatedItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIdx: 0,
      fetched: false,
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.updateRelated = this.updateRelated.bind(this);
  }

  componentDidMount() {
    for (var i = 0; i < this.props.relatedList.length; i++) {
      axios
        .get("/api/fec2/hr-rfe/products/" + this.props.relatedList[i])
        .then((result) => {
          this.setState({
            [result.data.id]: result.data,
          });
          return result.data.id;
        })
        .catch((err) => {
          console.log("failed to get details of related products");
        })
        .then((id) => {
          // get image of each related item
          axios
            .get("/api/fec2/hr-rfe/products/" + id + "/styles")
            .then((result) => {
              var styles = result.data.results;
              var idx = 0;
              for (var i = 0; i < styles.length; i++) {
                if (styles[i]["default?"] === true) {
                  idx = i;
                }
              }
              var newState = this.state[result.data.product_id];
              newState.img = styles[idx].photos[0].thumbnail_url;
              newState.sale_price = styles[idx].sale_price;
              newState.original_price = styles[idx].original_price;
              this.setState({
                [result.data.product_id]: newState,
              });
            })
            .catch((err) => {
              console.log("failed to get image");
            });
          // get the ratings of each related item
          axios
            .get("/api/fec2/hr-rfe/reviews/meta?product_id=" + id)
            .then((result) => {
              if (Object.keys(result.data.ratings).length > 0) {
                var totalCount = 0;
                var totalRatings = 0;
                for (var key in result.data.ratings) {
                  totalRatings += parseInt(result.data.ratings[key]) * key;
                  totalCount += parseInt(result.data.ratings[key]);
                }
                var avgRating = totalRatings / totalCount;
                var newState = this.state[result.data.product_id];
                newState.rating = avgRating;
                this.setState({
                  [result.data.product_id]: newState,
                });
              }
              this.setState({
                fetched: true
              })
              return result.data.product_id;
            })
            .catch((err) => {
              console.log("failed to fetch ratings");
            });
        });
    }
  }

  updateRelated(newId) {
    this.setState({
      fetched: false,
      currentIdx: 0,
    });

    // for each of the related items, we want their details
    for (var i = 0; i < this.props.relatedList.length; i++) {
      axios
        .get("/api/fec2/hr-rfe/products/" + this.props.relatedList[i])
        .then((result) => {
          this.setState({
            [result.data.id]: result.data,
          });
          return result.data.id;
        })
        .catch((err) => {
          console.log("failed to get details of related products");
        })
        .then((id) => {
          // get image of each related item
          axios
            .get("/api/fec2/hr-rfe/products/" + id + "/styles")
            .then((result) => {
              var styles = result.data.results;
              console.log("styles", styles);
              var idx = 0;
              for (var i = 0; i < styles.length; i++) {
                if (styles[i]["default?"] === true) {
                  idx = i;
                }
              }
              var newState = this.state[result.data.product_id];
              newState.img = styles[idx].photos[0].thumbnail_url;
              newState.sale_price = styles[idx].sale_price;
              newState.original_price = styles[idx].original_price;
              this.setState({
                [result.data.product_id]: newState,
              });
            })
            .catch((err) => {
              console.log("failed to get image");
            });
          // get the ratings of each related item
          axios
            .get("/api/fec2/hr-rfe/reviews/meta?product_id=" + id)
            .then((result) => {
              if (Object.keys(result.data.ratings).length > 0) {
                var totalCount = 0;
                var totalRatings = 0;
                for (var key in result.data.ratings) {
                  totalRatings += parseInt(result.data.ratings[key]) * key;
                  totalCount += parseInt(result.data.ratings[key]);
                }
                var avgRating = totalRatings / totalCount;
                var newState = this.state[result.data.product_id];
                newState.rating = avgRating;
                this.setState({
                  [result.data.product_id]: newState,
                });
              }
              this.setState({
                fetched: true
              })
              return result.data.product_id;
            })
            .catch((err) => {
              console.log("failed to fetch ratings");
            });
        });
    }
  }

  previous(event) {
    if (this.state.currentIdx > 0) {
      this.setState({
        currentIdx: this.state.currentIdx - 1,
      });
    }
  }

  next(event) {
    if (this.state.currentIdx < this.props.relatedList.length - 3) {
      this.setState({
        currentIdx: this.state.currentIdx + 1,
      });
    }
  }

  // fetch() {
  //   axios
  //     .get("/api/fec2/hr-rfe/products/" + this.props.itemId)
  //     .then((result) => {
  //       this.setState({
  //         item: result.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("error");
  //     });
  //   axios
  //     .get("/api/fec2/hr-rfe/reviews/meta?product_id=" + this.props.itemId)
  //     .then((result) => {
  //       if (Object.keys(result.data.ratings).length > 0) {
  //         var totalCount = 0;
  //         var totalRatings = 0;
  //         for (var key in result.data.ratings) {
  //           totalRatings += parseInt(result.data.ratings[key]) * key;
  //           totalCount += parseInt(result.data.ratings[key]);
  //         }
  //         var avgRating = totalRatings / totalCount;
  //         this.setState({
  //           rating: avgRating,
  //         });
  //       }
  //     })
  //   }

  render() {
    if (this.props.relatedList.length === 0) {
      return <div></div>;
    } else if (this.props.relatedList.length === 1) {
      return (
        <div>
          <div>Item {this.state.currentIdx}</div>
        </div>
      );
    } else if (this.props.relatedList.length === 2) {
      <div>
        <div>Item {this.state.currentIdx}</div>
        <div>Item {this.state.currentIdx + 1}</div>
      </div>;
    } else {
      if (this.state.fetched) {
        return (
          <div className="carouselWrapper">
            {this.state.currentIdx !== 0 ? (
              <button className="previous" onClick={this.previous}>
                &lt;
              </button>
            ) : (
              <button className="previous hide" onClick={this.previous}>
                &lt;
              </button>
            )}
            <div className="carouselListContent">
              <RelatedProductCard
                currentItem={this.props.currentItem}
                item={
                  this.state[this.props.relatedList[this.state.currentIdx]]
                }
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
              />
              <RelatedProductCard
                currentItem={this.props.currentItem}
                item={
                  this.state[this.props.relatedList[this.state.currentIdx + 1]]
                }
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
              />
              <RelatedProductCard
                currentItem={this.props.currentItem}
                item={
                  this.state[this.props.relatedList[this.state.currentIdx + 2]]
                }
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
              />
            </div>
            {this.state.currentIdx !== this.props.relatedList.length - 3 ? (
              <button className="next" onClick={this.next}>
                &gt;
              </button>
            ) : (
              <button className="next hide" onClick={this.next}>
                &gt;
              </button>
            )}
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  }
}

export default RelatedItemList;
