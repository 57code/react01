import {createStore} from 'redux';

// reducer:状态修改具体执行者
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'add':
            return state + 1;    
        case 'minus':
            return state - 1;    
        default:
            return state;
    }
}

export default createStore(counterReducer)