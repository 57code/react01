// import React from 'react';
// import ReactDOM from 'react-dom';
// import React, {Component} from './kreact';
// import ReactDOM from './kreact-dom';
import React from './kkreact'
import {render} from './kkreact/ReactDOM';

class Comp2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 'something'
    }
  }
  componentDidMount() {
    this.setState({msg:'dong~~~'})
  }
  onClick = ()=>{
    this.setState({msg:'mua~~~'})
  }
  render() {
    return (
      <h2 onClick={this.onClick}>hi, class comp! {this.state.msg}</h2>
    )
  }
}
function Comp(props) {
  return (
      <h2>hi, {props.name}</h2>
  )
}

const jsx = (
  <div id="demo">
    <span>hi</span>
    <Comp name="kaikeba"></Comp>
    <Comp2></Comp2>
  </div>
)


console.log(jsx);


render(jsx, document.getElementById('root'));

