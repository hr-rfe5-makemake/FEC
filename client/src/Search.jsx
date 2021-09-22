import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  handleInputChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleSearchClick() {
    this.props.onClick(this.state.term);
    this.setState({
      term: ''
    })
  }

  render() {
    return (
      <div id="search">
        <input id="search-field" type="text" value={this.state.term} onChange={this.handleInputChange.bind(this)} placeholder="Enter product number"/>
        <img id="search-btn" src=".././img/search.png" onClick={this.handleSearchClick.bind(this)}></img>
      </div>
    )
  }
}

export default Search;