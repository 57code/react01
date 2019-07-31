import React, { Component } from "react";
// import store from '../store';
import { connect } from "react-redux";
import { add, minus, asyncAdd } from "../store/counter";

// 参数1：mapStateToProps = (state) => {return {num: state}}
// 参数2：mapDispatchToProps = dispatch => {return {add:()=>dispatch({type:'add'})}}
// connect两个任务：
// 1.自动渲染
// 2.映射到组件属性
@connect(
  state => ({ num: state.counter }),
  {
    // 理解为vuex中的action
    add,
    minus,
    asyncAdd
  }
)
class ReduxTest extends Component {
  // componentDidMount() {
  //     // 订阅状态变更
  //     store.subscribe(() => {
  //         this.forceUpdate();
  //     })
  // }
  render() {
    return (
      <div>
        {/* {store.getState()} */}
        {this.props.num}
        <div>
          <button onClick={() => this.props.add(2)}>+</button>
          <button onClick={this.props.minus}>-</button>
          <button onClick={this.props.asyncAdd}>+</button>
        </div>
      </div>
    );
  }
}
export default ReduxTest;
