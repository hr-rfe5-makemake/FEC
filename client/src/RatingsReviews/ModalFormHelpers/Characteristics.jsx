import React from 'react';
import axios from 'axios';
import urlFragment from '../urlFragment.jsx';

class Characteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: [],
      doneMounting: false
    }
  }

  getMetaData(product_id) {
    axios.get(`${urlFragment}reviews/meta?product_id=${product_id}`)
    .then(metaData => {
      this.setState({
        metaData: metaData,
        doneMounting: true
      });
      this.createInputs();
    })
    .catch(err => console.error(err))
  }

  createInputs() {
    var options = {
      Size: [[1, "A size too small"], [2, "½ a size too small"], [3, "Perfect"], [4, "½ a size too big"], [5, "A size too wide"]],
      Width: [[1, "Too narrow"], [2, "Slightly narrow"], [3, "Perfect"], [4, "Slightly wide"], [5, "Too wide"]],
      Comfort: [[1, "Uncomfortable"], [2, "Slightly uncomfortable"], [3, "Ok"], [4, "Comfortable"], [5, "Perfect"]],
      Quality: [[1, "Poor"], [2, "Below average"], [3, "What I expected"], [4, "Pretty great"], [5, "Perfect"]],
      Length: [[1, "Runs short"], [2, "Runs slightly short"], [3, "Perfect"], [4, "Runs slightly long"], [5, "Runs long"]],
      Fit: [[1, "Runs tight"], [2, "Runs slightly tight"], [3, "Perfect"], [4, "Runs slightly long"], [5, "Runs long"]],
    };

    var chars = this.state.metaData.data.characteristics;
    var charInputs = [];

    for (var key in chars) {
      var radios = [];

      for (var i = 0; i < options[key].length; i++) {
        radios.push(<span key={key + i}><input type="radio" value={options[key][i][0]} name={chars[key].id} required/>{options[key][i][1]}</span>)
      }
      charInputs.push(<div  className={'rr-radio-container'} key={key} id={`${key}-label`}><b>{key}<span style={{color: "red"}}>*</span>  </b><span className="rr-radios">{radios}</span></div>);
    }

    return <div id="char-input-container" onChange={this.props.handleCharChange}>{charInputs}</div>;
  }

  componentDidMount() {
    this.getMetaData(this.props.product_id);
  }

  render() {
    if (!this.state.doneMounting) {
      return null;
    } else {
      return (
        <div>{this.createInputs()}</div>
      )
    }
  }
}


export default Characteristics;