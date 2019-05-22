import React, { Component } from "react";

function Cart(props) {
    // console.log(props);
    
  return (
    <table>
      <tbody>
        {props.data.map(d => (
          <tr key={d.text} onClick={() => props.onSelect(d.text)}>
            <td>{d.text}</td>
            <td>{d.count}</td>
            <td>￥{d.price * d.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default class CartSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      name: "",
      goods: [
        { text: "百万年薪架构师", price: 100, id: 1 },
        { text: "web全栈架构师", price: 80, id: 2 },
        { text: "Python爬虫", price: 60, id: 3 }
      ],
      cart: []
    };

    setTimeout(() => {
      this.setState({ title: "react购物车" });
    }, 1000);

    // this.handleChange = this.handleChange.bind(this)
  }
  handleChange = e => {
    this.setState({ name: e.target.value });
  };
  addGood = () => {
    this.setState({
      goods: [...this.state.goods, { text: this.state.name, price: 666 }]
    });
  };

  addCart(good) {
    const item = this.state.cart.find(c => c.text === good.text);
    if (item) {
      item.count += 1;
      this.setState({ cart: [...this.state.cart] });
    } else {
      this.setState({ cart: [...this.state.cart, { ...good, count: 1 }] });
    }
  }

  //   子父通信
  onSelect = name => {
    console.log(name);
  };

  render() {
    const goods = this.state.goods.map(good => (
      <li key={good.text}>
        {good.text}
        <button onClick={() => this.addCart(good)}>加购</button>
      </li>
    ));
    return (
      <div>
        {/* 条件语句 */}
        {this.state.title && <h1>{this.state.title}</h1>}
        {/* 事件处理 */}
        <div>
          {/* react中单项数据流 */}
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
            // onChange={this.handleChange}
          />
          <button onClick={e => this.addGood()}>添加</button>
        </div>
        {/* 循环操作 */}
        <ul>{goods}</ul>

        {/* 购物车 */}
        <Cart data={this.state.cart} onSelect={this.onSelect} />
      </div>
    );
  }
}
