import React from 'react';
import axios from 'axios';
import RelatedItemList from './RelatedItemList.jsx';
import OutfitList from './OutfitList.jsx';
import _ from 'underscore';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    var outfitList = JSON.parse(localStorage.getItem('outfitList'));
    if (outfitList === null) {
      outfitList = [];
    }
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

  // componentDidMount() {
  //   // get related items
    // axios.get('/api/fec2/hr-rfe/products/' +  + this.props.currentItem + '/related')
    // .then(result => {
    //   console.log(result.data);
    //   this.setState({
    //     relatedItems: result.data
    //   })
    // })
    // .catch(err => {
    //   console.log('error');
    // })
  // }

  componentDidMount() {
    this.updateRelated(this.props.currentItemId);
  }

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

  addOutfit (newId) {
    var newOutfitList = this.state.outfitList;
    newOutfitList = [...newOutfitList, newId]
    this.setState({
      outfitList: newOutfitList
    });
    localStorage.setItem('outfitList', JSON.stringify(newOutfitList));
  }

  removeOutfit (newId) {
    var newOutfitList = this.state.outfitList;
    var idx = newOutfitList.findIndex(element => element === newId);
    newOutfitList.splice(idx, 1);
    this.setState({
      outfitList: newOutfitList
    });
    localStorage.setItem('outfitList', JSON.stringify(newOutfitList));
  }

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