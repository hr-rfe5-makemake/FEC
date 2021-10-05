import React from 'react';
import axios from 'axios';
import RelatedItemList from './RelatedItemList.jsx';
import OutfitList from './OutfitList.jsx';
import _ from 'underscore';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    // if user has outfit list already fetch that otherwise set it as empty
    var outfitList = JSON.parse(localStorage.getItem('outfitList'));
    if (outfitList === null) {
      outfitList = [];
    }
    // fetched variable to check if api requests are ran already
    // overlay variable to know if modal is open or not
    this.state = {
      relatedItems: [],
      outfitList: outfitList,
      fetched: false,
      overlay: false
    }
    this.addOutfit = this.addOutfit.bind(this);
    this.updateRelated = this.updateRelated.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  // fetch list of related products on mount
  componentDidMount() {
    this.updateRelated(this.props.currentItemId);
  }

  // when current item changes, we want to fetch new related products
  updateRelated(id) {
    this.setState({
      fetched: false
    })
    axios.get('/api/fec2/hr-rfe/products/' +  + id + '/related')
    .then(result => {
      this.setState({
        relatedItems: _.uniq(result.data),
        fetched: true
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // method to add current item to outfit list
  addOutfit (newId) {
    var newOutfitList = this.state.outfitList;
    newOutfitList = [...newOutfitList, newId]
    this.setState({
      outfitList: newOutfitList
    });
    localStorage.setItem('outfitList', JSON.stringify(newOutfitList));
  }

  // method to remove selected outfit
  removeOutfit (newId) {
    var newOutfitList = this.state.outfitList;
    var idx = newOutfitList.findIndex(element => element === newId);
    newOutfitList.splice(idx, 1);
    this.setState({
      outfitList: newOutfitList
    });
    localStorage.setItem('outfitList', JSON.stringify(newOutfitList));
  }

  // method to toggle overlay when modal is on/off
  toggleOverlay() {
    this.setState({
      overlay: !this.state.overlay
    })
  }

  render() {
    if (this.state.fetched) {
      return (
        <div className='relatedItemsComponent'>
        <div className="overlay" style={{display: this.state.overlay ? 'block' : 'none'}}></div>
        <div className='carouselList'>
          <h4 className='componentHeader'>Related Products</h4>
          <RelatedItemList currentItemId={this.props.currentItemId} currentItem={this.props.currentItem} changeCurrentProduct={this.props.changeCurrentProduct} relatedList={this.state.relatedItems} updateRelated={this.updateRelated} toggleOverlay={this.toggleOverlay}/>
          <h4 className='componentHeader'>Your Outfit</h4>
          <OutfitList currentItemId={this.props.currentItemId} currentItem={this.props.currentItem} changeCurrentProduct={this.props.changeCurrentProduct} outfitList={this.state.outfitList} addOutfit={this.addOutfit} updateRelated={this.updateRelated} removeOutfit={this.removeOutfit}/>
        </div>
        </div>
      )

    } else {
      return <div>Loading</div>
    }
  }


}

export default RelatedItems;