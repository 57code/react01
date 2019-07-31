export const add = num => ({ type: "add", payload: num }); // action creator
export const minus = () => ({ type: "minus" }); // action creator

// 异步的返回的是函数
export const asyncAdd = (dispatch, getState) => dispatch => {
  // 异步调用在这里
  setTimeout(() => {
    dispatch({ type: "add" });
  }, 1000);
};


export const counterReducer = function(state = 0, action) {
    const num = action.payload || 1;
    switch (action.type) {
      case "add":
        return state + num;
      case "minus":
        return state - num;
      default:
        return state;
    }
  };