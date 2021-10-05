import React from "react";

class RelatedItemComparison extends React.Component {
  constructor(props) {
    super(props);
    this.combiner = this.combiner.bind(this);
  }

  // method to combine the features of the current item and compared item such that features do not overlap and each feature is related to a value of current item and compared item
  combiner() {
    var currentItem = this.props.currentItem.features;
    var comparedItem = this.props.comparedItem.features;
    var combined = [];
    for (var i = 0; i < currentItem.length; i++) {
      var curFeature = {
        feature: currentItem[i].feature,
        currentItem: currentItem[i].value,
      };
      var comparedFeatureIdx = comparedItem.findIndex(
        (element) => element.feature === currentItem[i].feature
      );
      if (comparedFeatureIdx === -1) {
        curFeature.comparedItem = null;
      } else {
        curFeature.comparedItem = comparedItem[comparedFeatureIdx].value;
        comparedItem.splice(comparedFeatureIdx, 1);
      }
      combined.push(curFeature);
    }
    for (var i = 0; i < comparedItem.length; i++) {
      curFeature = {
        feature: comparedItem[i].feature,
        comparedItem: comparedItem[i].value,
        curItem: null,
      };
      combined.push(curFeature);
    }
    return combined;
  }

  render() {
    return (
      <div className="related-modal" onClick={function(event){event.stopPropagation();
      }}>
        <div className="header">
          <a href="#" onClick={this.props.closeCompare} className="cancel">
            X
          </a>
        </div>
        <table>
          <tbody>
          <tr>
            <td className='tableTitle'>Comparing</td>
            </tr>
            <tr>
              <th className='currentItemCell'>{this.props.currentItem.name}</th>
              <th></th>
              <th className='comparedItemCell'>{this.props.comparedItem.name}</th>
            </tr>
            {this.combiner().map((feature) => {
              return (
                <tr key={feature.feature}>
                  <td className='currentItemCell'>{feature.currentItem}</td>
                  <td className='feature'>{feature.feature}</td>
                  <td className='comparedItemCell'>{feature.comparedItem}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RelatedItemComparison;
