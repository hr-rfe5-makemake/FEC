import React from 'react';

class IndividualTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>==> INDIVIDUAL TILE COMPONENT</div>
        <div>Star Rating Container</div>
        <div>Date</div>
        <div>Review Summary</div>
        <div>Review Body</div>
        <div>Etc.</div>
      </div>
    );
  }
}

export default IndividualTile;