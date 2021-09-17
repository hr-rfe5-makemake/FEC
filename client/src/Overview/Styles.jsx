import React from 'react';

const RenderStyles = ({currentStyle, styles, onClick}) => {
  if (styles.results === undefined) {
    return [];
  }
  const click = (style) => {
    onClick(style);
  }
  let result = [];
  for (let i = 0; i < styles.results.length; i++) {
    if (currentStyle.name === styles.results[i].name) {
      result.push(<div className="crop"
        key={styles.results[i].style_id}><img
        className="style-thumbnail" src={styles.results[i].photos[0].thumbnail_url}
        onClick={event => { click(styles.results[i]); }}/>
        <img id="overlay" src=".././img/greenCheckMark.png"/>
      </div>);
    } else {
      result.push(<div className="crop"
        key={styles.results[i].style_id}><img
        className="style-thumbnail" src={styles.results[i].photos[0].thumbnail_url}
        onClick={event => { click(styles.results[i]); }}/></div>);
    }
  }
  return result;
}
const Styles = (props) => (
  <div>
    {props.currentStyle && <h5 id="style-name">Current Style:<br></br>{props.currentStyle.name}</h5>}
    <div id="styles">
      <RenderStyles
        currentStyle={props.currentStyle}
        styles={props.styles}
        onClick={props.onClick}
      />
    </div>
  </div>
)

export default Styles;