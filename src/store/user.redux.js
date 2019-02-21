const initialState = {
  isLogin: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'login':
      return {isLogin: true};

    default:
      return state;
  }
};
// for redux-thunk
// export function login(){
//     return (dispatch)=>{
//         // mock一个异步登录
//         setTimeout(()=>{
//             dispatch({type:'login'})
//         }, 1000)
//     }
// }

// for saga
export function login(){
  return {type:'login_request'}
}