import React, { Component } from "react";

// import store from '../store'
import { add, minus, asyncAdd } from "../store/counter.redux";
import { connect } from "react-redux";

@connect(
  state => ({ num: state.counter }), // 状态映射
  { add, minus, asyncAdd }
)
class ReduxTest extends Component {
  render() {
    return (
      <div>
        <p>{this.props.num}</p>
        <div>
          <button onClick={() => this.props.minus()}>-</button>
          <button onClick={() => this.props.add()}>+</button>
          <button onClick={() => this.props.asyncAdd()}>asyncAdd</button>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({ num: state });
// const mapDispatchToProps = dispatch => ({
//   add: () => dispatch({ type: "add" }),
//   minus: () => dispatch({ type: "minus" })
// });

export default ReduxTest;
