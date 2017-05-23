var React = require('react');
var ReactDom = require('react-dom');
var store = require('../../store/main/index');
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'


class MessageList extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     messageList: []
        // };
        // this.getData();
    }
    componentWillMount() {
        // this will update the nodes on state 
        this.props.onIncreaseClick();
    }
    render() {
        var self = this;
        console.log(this.props);
        var message = this.props.messageList;
        var arr = [];
        message.forEach(em => arr.push(<li key={em.Message}>{em.Message}</li>));
        return <section className="pageContentInner">
            <div className="head-section">
                <h1>MessageList: </h1>
            </div>
            <ul>
                {arr}
            </ul>
            <button onClick={self.props.onIncreaseClick}>新增</button>
        </section>
    }

}
var getData = (callback) => {
    var self = this;
    store.getAllData(function (data) {
        var i = 0;
        var len = data.length;
        var messageListArr = [];
        for (; i < len; i++) {
            messageListArr[i] = { 'Message': data[i].Message };
        }
        console.log(messageListArr);
        callback(messageListArr);
    });
}
var reducers = function (state = { obj: [] }, action) {
    //console.log('action:' + action);
    switch (action.type) {
        case 'increase':
            return { obj: action.payload }
        default:
            return state
    }
}

const theStore = createStore(reducers, applyMiddleware(thunk));

const increaseAction = (dispatch, getState) => {
    //在函数体内可以使用 dispatch 方法来发射其他 action
    //在函数体内可以使用 getState 方法来获取当前的state
    fetch('/data/getMessage').then(data => {
        return data.json()
    }).then(list => {
        //console.log(text);
        dispatch({
            type: 'increase',
            payload: list
        });
    }).catch(error => {
        //发射普通 action, 其负载是一个error
        dispatch({
            type: 'FAIL_increase',
            payload: error,
            error: true
        });
    });
}

var getDefault = () => {
    return fetch('/data/getMessage').then(data => {
        return data.json()
    }).then(list => {
        return list;
    }).catch(error => {
        //发射普通 action, 其负载是一个error
        return [{ "Message": "Hello Nodejs123" }];
    });
};

function mapStateToProps(state) {
    return {
        messageList: state.obj,
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}
const App = connect(mapStateToProps, mapDispatchToProps)(MessageList);

ReactDom.render(
    <Provider store={theStore}>
        <App />
    </Provider>,
    document.getElementById("main-container")
)
