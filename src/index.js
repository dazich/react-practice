
// index.js
// import '../css/test.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App';
import rootReducer from './reducers'

const store = createStore(rootReducer)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
// ReactDOM.render(<App/>, document.getElementById('app'));

// import(/* webpackChunkName: "lodash" */ './components/sum').then(f => console.log(f));
// 动态导入APP.js时会提示 NODE_ENV 不是 production

// 与react-hot-loader冲突
// if (module.hot) {
//     module.hot.accept('./App', () => {
//         console.log('==============Accepting the updated printMe module!');
//     })
// }