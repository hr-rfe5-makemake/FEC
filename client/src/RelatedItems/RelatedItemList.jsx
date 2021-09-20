import React from "react";
import axios from "axios";
import RelatedProductCard from "./RelatedProductCard.jsx";
import _ from "underscore";

class RelatedItemList extends React.Component {
  constructor(props) {
    super(props);
    // currentIdx variable keeps track of which index of related list the carousel is on
    // fetched variable keeps track of whether api calls finished fetching data
    this.state = {
      currentIdx: 0,
      fetched: false,
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.updateRelated = this.updateRelated.bind(this);
  }

  // fetch details of all the related products upon mount
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
                fetched: true,
              });
              return result.data.product_id;
            })
            .catch((err) => {
              console.log("failed to fetch ratings");
            });
        });
    }
  }

  // fetch detail of all related items of new current item upon update
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
              // console.log("styles", styles);
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
                fetched: true,
              });
              return result.data.product_id;
            })
            .catch((err) => {
              console.log("failed to fetch ratings");
            });
        });
    }
  }

  // decrement currentIdx by 1 when previous button is clicked
  previous(event) {
    if (this.state.currentIdx > 0) {
      this.setState({
        currentIdx: this.state.currentIdx - 1,
      });
    }
  }

  // increment currendIdx by 1 when next button is clicked
  next(event) {
    if (this.state.currentIdx < this.props.relatedList.length - 3) {
      this.setState({
        currentIdx: this.state.currentIdx + 1,
      });
    }
  }

  render() {
    if (this.props.relatedList.length === 0) {
      return <div>No Related Products</div>;
    } else if (this.props.relatedList.length === 1) {
      return (
        <div className="carouselWrapper">
          <div className="carouselListContent">
            <RelatedProductCard
              currentItem={this.props.currentItem}
              item={this.state[this.props.relatedList[this.state.currentIdx]]}
              changeCurrentProduct={this.props.changeCurrentProduct}
              updateRelated={this.props.updateRelated}
              toggleOverlay={this.props.toggleOverlay}
            />
          </div>
        </div>
      );
    } else if (this.props.relatedList.length === 2) {
      <div className="carouselWrapper">
        <div className="carouselListContent">
          <RelatedProductCard
            currentItem={this.props.currentItem}
            item={this.state[this.props.relatedList[this.state.currentIdx]]}
            changeCurrentProduct={this.props.changeCurrentProduct}
            updateRelated={this.props.updateRelated}
            toggleOverlay={this.props.toggleOverlay}
          />
          <RelatedProductCard
            currentItem={this.props.currentItem}
            item={this.state[this.props.relatedList[this.state.currentIdx + 1]]}
            changeCurrentProduct={this.props.changeCurrentProduct}
            updateRelated={this.props.updateRelated}
            toggleOverlay={this.props.toggleOverlay}
          />
        </div>
      </div>;
    } else {
      if (this.state.fetched) {
        return (
          <div className="carouselWrapper">
            {this.state.currentIdx !== 0 ? (
              <div className="previous" onClick={this.previous}>
                &lt;
              </div>
            ) : (
              <div className="previous hide" onClick={this.previous}>
                &lt;
              </div>
            )}
            <div className="carouselListContent">
              <RelatedProductCard
                currentItem={this.props.currentItem}
                item={this.state[this.props.relatedList[this.state.currentIdx]]}
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                toggleOverlay={this.props.toggleOverlay}
              />
              <RelatedProductCard
                currentItem={this.props.currentItem}
                item={
                  this.state[this.props.relatedList[this.state.currentIdx + 1]]
                }
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                toggleOverlay={this.props.toggleOverlay}
              />
              <RelatedProductCard
                currentItem={this.props.currentItem}
                item={
                  this.state[this.props.relatedList[this.state.currentIdx + 2]]
                }
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                toggleOverlay={this.props.toggleOverlay}
              />
            </div>
            {this.state.currentIdx !== this.props.relatedList.length - 3 ? (
              <div className="next" onClick={this.next}>
                &gt;
              </div>
            ) : (
              <div className="next hide" onClick={this.next}>
                &gt;
              </div>
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
