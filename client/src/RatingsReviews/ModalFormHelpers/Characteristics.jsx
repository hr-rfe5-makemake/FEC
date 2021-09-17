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
    console.log('CHARS:', chars)

    for (var key in chars) {
      var radios = [];

      //  console.log(key, options[key])
      for (var i = 0; i < options[key].length; i++) {
        console.log(options[key][i])
        radios.push(<span><input type="radio" value={options[key][i][0]} name={chars[key].id} required/>{options[key][i][1]}</span>)
      }
      charInputs.push(<div key={key} id={`${key}-label`}><b>{key}<span style={{color: "red"}}>*</span>  </b>{radios}</div>);
    }


    return <div id="char-input-container" onChange={this.props.handleCharChange}>{charInputs}</div>;
  }


  componentDidMount() {
    this.getMetaData(this.props.product_id);
    console.log('META:', this.state.metaData)

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