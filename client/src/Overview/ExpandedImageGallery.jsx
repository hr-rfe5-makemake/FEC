import React from 'react';

const GetImages = ({urls, onClick, index}) => {
  if (urls === undefined) {
    return [];
  }
  let result = [];
  for (let i = 0; i < urls.length; i++) {
    if (i === index) {
      result.push(
        <div key={`${i}`} id="selected" className="image-gallery expanded-crop">
          <img className="expanded-image" src={urls[i].thumbnail_url} onClick={() => { onClick(i); }}/>
        </div>
      );
    } else {
      result.push(
        <div key={`${i}`} className="image-gallery expanded-crop">
          <img className="expanded-image" src={urls[i].thumbnail_url} onClick={() => { onClick(i); }}/>
        </div>
      );
    }
  }
  return result;
}

const ExpandedImageGallery = (props) => (
  <div id="product-img-expanded">
    <GetImages urls={props.urls} index={props.currentIndex} onClick={props.onClick}/>
  </div>
)

export default ExpandedImageGallery;