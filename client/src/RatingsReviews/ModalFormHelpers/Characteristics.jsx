import React from 'react';
import axios from 'axios';
import urlFragment from '../urlFragment.jsx';

class Characteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: []
    }
  }

  getMetaData(product_id) {
    axios.get(`${urlFragment}reviews/meta?product_id=${product_id}`)
    .then(metaData => {
      this.setState({
        metaData: metaData
      });
      this.createInputs();
    })
    .catch(err => console.error(err))
  }

  createInputs() {
    var options = {
      size: [[1, "A size too small"], [2, "½ a size too small"], [3, "Perfect"], [4, "½ a size too big"], [5, "A size too wide"]],
      width: [[1, "Too narrow"], [2, "Slightly narrow"], [3, "Perfect"], [4, "Slightly wide"], [5, "Too wide"]],
      comfort: [[1, "Uncomfortable"], [2, "Slightly uncomfortable"], [3, "Perfect"], [4, "Comfortable"], [5, "Perfect"]],
      Quality: [[1, "Poor"], [2, "Below average"], [3, "What I expected"], [4, "Pretty great"], [5, "Perfect"]],
      Length: [[1, "Runs short"], [2, "Runs slightly short"], [3, "Perfect"], [4, "Runs slightly long"], [5, "Runs long"]],
      Fit: [[1, "Runs tight"], [2, "Runs slightly tight"], [3, "Perfect"], [4, "Runs slightly long"], [5, "Runs long"]],
    };

    var chars = this.state.metaData.data.characteristics;
    var charInputs = [];

    for (var key in chars) {
      var subinputs = []
      var theseOptions = options[key];
      for (var i = 0; i < theseOptions.length; i++) {
        subinputs.push(
          <div><input type="radio" value={theseOptions[i][0]} name={key}/>theseOptions[i][1]</div>
        );
      }
      console.log(subinputs)
      charInputs.push(<div>{subinputs}</div>);


      inputs.push(<div id={`${key}-input`}>{subinputs}</div>);
    }

    console.log(chars)

    return <div id="char-input-container" onChange={this.props.handleCharChange}>{charInputs}</div>;
  }


  componentDidMount() {
    this.getMetaData(this.props.product_id)
    console.log('META:', this.state.metaData)
  }

  render() {
    return (
      <div>hi</div>
    )
  }
}


export default Characteristics;