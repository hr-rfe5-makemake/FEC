import React from "react";
import OutfitProductCard from "./OutfitProductCard.jsx";
import axios from 'axios';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIdx: -1,
      fetched: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.addOutfit = this.addOutfit.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
  }

  // fetch the details of items on outfit list upon mount
  componentDidMount() {
    for (var i = 0; i < this.props.outfitList.length; i++) {
      this.fetchData(this.props.outfitList[i]);
    }
  }

  // method to fetch details of an item
  fetchData(id) {
    axios
      .get("/api/fec2/hr-rfe/products/" + id)
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
        // get image of each outfit item
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
        // get the ratings of each outfit item
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
              // MIGHT HAVE TO FIX THIS LATER BECAUSE FETCH AUTOMATICALLY CHANGES TO TRUE BEFORE FINISHING ALL FETCHES
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

  // remove selected product from outfit list
  removeOutfit(newId) {
    this.props.removeOutfit(newId);
    if (this.state.currentIdx !== -1) {
      this.setState({
        currentIdx: this.state.currentIdx - 1
      });
    }
  }

  // add current product to outfit list
  addOutfit() {
    console.log('click add outfit')
    if (!this.props.outfitList.includes(this.props.currentItemId)){
      this.props.addOutfit(this.props.currentItemId);
      this.setState({
        fetched: false
      })
      this.fetchData(this.props.currentItemId);
    } else {
      console.log('Product already in outfit list')
    }
  }

  // handle previous button for carousel list
  previous(event) {
    if (this.state.currentIdx > -1) {
      this.setState({
        currentIdx: this.state.currentIdx - 1,
      });
    }
  }

    // handle next button for carousel list
  next(event) {
    if (this.state.currentIdx < this.props.outfitList.length - 3) {
      this.setState({
        currentIdx: this.state.currentIdx + 1,
      });
    }
  }


  render() {
    if (this.state.fetched || this.props.outfitList.length === 0) {
      return (
        <div className="carouselWrapper">
          {this.state.currentIdx >= 0 ? (
            <button className="previous" onClick={this.previous}>
              &lt;
            </button>
          ) : (
            <button className="previous hide" onClick={this.previous}>
              &lt;
            </button>
          )}
          {this.props.outfitList.length === 0 ? (
            <div className="carouselListContent">
              <div className="addOutfitCard" onClick={this.addOutfit} >ADD CURRENT ITEM</div>
            </div>
          ) : this.props.outfitList.length === 1 ? (
            <div className="carouselListContent">
              <div className="addOutfitCard" onClick={this.addOutfit}>ADD CURRENT ITEM</div>
              <OutfitProductCard
                item={this.state[this.props.outfitList[this.state.currentIdx + 1]]}
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                removeOutfit={this.removeOutfit}
              />
              <div className='productCard borderless'></div>
            </div>
          ) : this.state.currentIdx === -1 ? (
            <div className="carouselListContent">
              <div className="addOutfitCard" onClick={this.addOutfit}>ADD CURRENT ITEM</div>
              <OutfitProductCard
                item={this.state[this.props.outfitList[this.state.currentIdx + 1]]}
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                removeOutfit={this.removeOutfit}
              />
              <OutfitProductCard
                item={this.state[this.props.outfitList[this.state.currentIdx + 2]]}
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                removeOutfit={this.removeOutfit}
              />
            </div>
          ) : (
            <div className="carouselListContent">
              <OutfitProductCard
                item={this.state[this.props.outfitList[this.state.currentIdx]]}
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                removeOutfit={this.removeOutfit}
              />
              <OutfitProductCard
                item={this.state[this.props.outfitList[this.state.currentIdx + 1]]}
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                removeOutfit={this.removeOutfit}
              />
              <OutfitProductCard
                item={this.state[this.props.outfitList[this.state.currentIdx + 2]]}
                changeCurrentProduct={this.props.changeCurrentProduct}
                updateRelated={this.props.updateRelated}
                removeOutfit={this.removeOutfit}
              />
            </div>
          )}
          {/* HAVE TO CHECK LENGTH OF OUTFIT LIST*/}
          {this.state.currentIdx < this.props.outfitList.length - 3 ? (
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
      return <div>LOADING...</div>;
    }
  }
}

export default OutfitList;
