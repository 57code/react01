import React, { Component, PureComponent } from "react";

// 容器组件
export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    setInterval(() => {
      // immutable.js
      this.setState({
        comments: [
          { body: "react is very good", author: "facebook" },
          { body: "vue is very good", author: "youyuxi" }
        ]
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          <Comment key={i} {...c} />
        ))}
      </div>
    );
  }
}
// 展示组件
// memo是一个高阶组件
const Comment = React.memo(function ({ body, author }) {
  console.log("render comment");

  return (
    <div>
      <p>{body}</p>
      <p> --- {author}</p>
    </div>
  );
})

// class Comment extends PureComponent {
// //   shouldComponentUpdate(props) {
// //     if (props.data.body === this.props.data.body && 
// //         props.data.author === this.props.data.author) {
// //         return false;
// //     }
// //     return true;
// //   }
    
//   render() {
//     console.log("render comment");
//     const {body, author} = this.props;
//     return (
//       <div>
//         <p>{body}</p>
//         <p> --- {author}</p>
//       </div>
//     );
//   }
// }
