import React from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery.jsx';
import ExpandedImageGallery from './ExpandedImageGallery.jsx';
import StarRating from './StarRating.jsx';
import SocialMediaShare from './SocialMediaShare.jsx';
import Styles from './Styles.jsx';
import AddToCart from './AddToCart.jsx';
import ProductOverview from './ProductOverview.jsx';

const url = '/API/fec2/hr-rfe';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      currentItem: {},
      styles: {},
      currentStyle: {},
      reviews: {},
      sku: null,
      quantity: 1,
      price: 0,
      currentStyleImages: [],
      currentImage: '',
      currentImageIndex: 0,
      isOpen: false,
      isZoomed: false,
      style: {}
    }
  }

  componentDidMount() {
    this.apiFetcher()
  }

  apiFetcher() {
    let id = this.props.currentItem_ID;
    axios.get(`${url}/products/${id}`)
      .then(result => {
        this.setState({
          currentItem: result.data,
          price: result.data.default_price,
          sku: null
        });
        axios.get(`${url}/products/${id}/styles`)
        .then(result => {
          this.setState({
            styles: result.data,
            currentStyle: result.data.results[0],
            currentStyleImages: result.data.results[0].photos,
            currentImage: result.data.results[0].photos[this.state.currentImageIndex].url,
            style: {
              backgroundPosition: this.state.style.backgroundPosition
            }
          });
        })
        axios.get(`${url}/reviews/meta/?product_id=${id}`)
        .then(result => {
          this.setState({
            reviews: result.data
          });
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  getStarRating() {
    if (this.state.reviews.ratings === undefined) {
      return 0;
    }
    let stars = 0;
    let count = 0;
    for (let rating in this.state.reviews.ratings) {
      stars += (Number(rating) * Number(this.state.reviews.ratings[rating]));
      count += Number(this.state.reviews.ratings[rating]);
    }
    return {avg: stars / count, count: count};
  }

  onChangeImageClick(index) {
    this.setState({
      currentStyleImages: this.state.currentStyleImages,
      currentImage: this.state.currentStyleImages[index].url,
      currentImageIndex: index
    });
  }

  onLeftClick() {
    let currentIndex = this.state.currentImageIndex;
    let length = this.state.currentStyleImages.length;
    if (currentIndex === 0) {
      this.setState({
        currentImage: this.state.currentStyleImages[length - 1].url,
        currentImageIndex: length - 1,
      });
    } else {
      this.setState({
        currentImage: this.state.currentStyleImages[currentIndex - 1].url,
        currentImageIndex: currentIndex - 1
      });
    }
  }

  onRightClick() {
    let currentIndex = this.state.currentImageIndex;
    let length = this.state.currentStyleImages.length;
    if (currentIndex === length - 1) {
      this.setState({
        currentImage: this.state.currentStyleImages[0].url,
        currentImageIndex: 0,
      });
    } else {
      this.setState({
        currentImage: this.state.currentStyleImages[currentIndex + 1].url,
        currentImageIndex: currentIndex + 1
      });
    }
  }

  onMainImageClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      isZoomed: false
    });
  }

  onZoomClick() {
    this.setState({
      isZoomed: !this.state.isZoomed
    })
  }

  handleMouseMove(event) {
    let zoom = 2.5;
    const { left, top, width, height } = event.target.getBoundingClientRect();
    let x;
    let y;
    if (height > width) {
      x = (left - event.pageX) * 4;
      y = (top - event.pageY) * 4;
    } else {
      x = (left - event.pageX + 175) * 4;
      y = (top - event.pageY + 75) * 4;
    }
    this.setState({
      style: {
        top: y,
        left: x
      }
    })
  }

  onClickStyle(style) {
    this.setState({
      currentStyle: style,
      currentImage: style.photos[0].url,
      currentStyleImages: style.photos,
      sku: null
    });
  }

  onChangeSize(event) {
    this.setState({
      sku: event.target.value
    });
  }

  onChangeQuantity(event) {
    this.setState({
      quantity: event.target.value
    });
  }

  onAddToCart() {
    for (let i = 0; i < this.state.quantity; i++) {
      axios.post(`${url}/cart`, {sku_id: this.state.sku})
        .then(() => {
          console.log('Added to Cart');
        })
        .catch(err => {
          console.log(err);
        })
    }
    axios.get(`${url}/cart`)
      .then(result => {
        this.setState({
          cart: result.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    if (this.props.currentItem_ID !== this.state.currentItem.id) {
      this.apiFetcher();
    }
    return (
      <div id="overview">
        <div id="main-overview">
          <div id="main-image-container">
            {!this.state.isOpen && (
              <ImageGallery
                urls={this.state.currentStyle.photos}
                currentIndex={this.state.currentImageIndex}
                onClick={this.onChangeImageClick.bind(this)}/>
              )
            }
            <img className="left" src=".././img/left-arrow.png"
              onClick={this.onLeftClick.bind(this)}
              hidden={this.state.currentImageIndex === 0  || this.state.isOpen}/>
            <img id="main-image" src={this.state.currentImage} onClick={() => {this.onMainImageClick(); }}/>
            <img className="right" src=".././img/right-arrow.png"
              onClick={this.onRightClick.bind(this)}
              hidden={this.state.currentImageIndex === this.state.currentStyleImages.length - 1  || this.state.isOpen}/>
          </div>
          {this.state.isOpen && (
              <dialog className="dialog" open>
                <div id="dialog-background" onClick={this.onMainImageClick.bind(this)}></div>
                {!this.state.isZoomed && (
                  <ExpandedImageGallery
                    urls={this.state.currentStyle.photos}
                    currentIndex={this.state.currentImageIndex}
                    isOpen={this.state.isOpen}
                    onClick={this.onChangeImageClick.bind(this)}/>
                  )
                }
                <img className="dialog-left" src=".././img/left-arrow.png"
                onClick={this.onLeftClick.bind(this)}
                hidden={this.state.currentImageIndex === 0 || this.state.isZoomed}/>
                    <img id="expanded-img" className={this.state.isZoomed ? 'minus' : 'plus'} onMouseMove={this.handleMouseMove.bind(this)} src={this.state.currentImage}
                      hidden={!this.state.isOpen}
                      onClick={this.onZoomClick.bind(this)}/>
                {this.state.isZoomed && (
                    <div id="zoom-container">
                      <img id="expanded-img-zoom" src={this.state.currentImage}
                        hidden={!this.state.isOpen}
                        style={this.state.style}/>
                    </div>
                  )
                }
                <img className="dialog-right" src=".././img/right-arrow.png"
                onClick={this.onRightClick.bind(this)}
                hidden={this.state.currentImageIndex === this.state.currentStyleImages.length - 1 || this.state.isZoomed}/>
              </dialog>
            )
          }
          <div id="product-details">
            <StarRating rating={this.getStarRating()}/>
            <h3 id="category">{this.state.currentItem.category}</h3>
            <h1 id="product-name">{this.state.currentItem.name}</h1>
            {this.state.currentStyle.sale_price ? (<h2 id="sale-price" className="price">${this.state.currentStyle.sale_price}</h2>) : (<h2 id="original-price" className="price">${this.state.currentStyle.original_price}</h2>)}
            <SocialMediaShare id={this.state.currentItem.id}/>
            <Styles
              styles={this.state.styles}
              currentStyle={this.state.currentStyle}
              onClick={this.onClickStyle.bind(this)}/>
            <AddToCart
              hide={this.state.hide}
              sku={this.state.sku}
              quantity={this.state.quantity}
              currentStyle={this.state.currentStyle}
              onChangeSize={this.onChangeSize.bind(this)}
              onChangeQuantity={this.onChangeQuantity.bind(this)}
              onClick={this.onAddToCart.bind(this)}/>
          </div>
        </div>
        <ProductOverview
          slogan={this.state.currentItem.slogan}
          description={this.state.currentItem.description}
          features={this.state.currentItem.features}/>
      </div>
    );
  }
}

export default Overview;