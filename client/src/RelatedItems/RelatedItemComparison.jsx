import React from "react";

class RelatedItemComparison extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "props",
      props.comparedItem.features,
      props.currentItem.features
    );
    this.combiner = this.combiner.bind(this);
  }

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
    console.log(combined);
    return combined;
  }

  render() {
    return (
      <div>
        <table>
          <caption>Comparing</caption>
          <tbody>
            <tr>
              <th>{this.props.currentItem.name}</th>
              <th></th>
              <th>{this.props.comparedItem.name}</th>
            </tr>
            {this.combiner().map((feature) => {
              return (
                <tr key={feature.feature}>
                  <td>{feature.currentItem}</td>
                  <td>{feature.feature}</td>
                  <td>{feature.comparedItem}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        YOU ARE IN THE POPUP
      </div>
    );
  }
}

export default RelatedItemComparison;
