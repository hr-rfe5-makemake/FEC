import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  render() {
    return (
      <div id="search">
        <input id="search-field" type="text" />
        {/* <button id="search-btn">Search</button> */}
        <img id="search-btn" src=".././img/search.png"></img>
      </div>
    )
  }
}

export default Search;