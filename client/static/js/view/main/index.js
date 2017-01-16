var React = require('react');
var ReactDom = require('react-dom');
var store = require('../../store/main/index');

class MessageList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            messageList:[]
        };
        this.getData();
    }
    render(){
        var self=this;
        var message=this.state.messageList;
        console.log(message);
        var arr=[];
        message.forEach(function(em){
            arr.push(<li key={em}>{em}</li>);
        });
        return <section className="pageContentInner">
                <div className="head-section">
                    <h1>MessageList: </h1>
                </div>
                <ul>
                    {arr}
                </ul>
                </section>
    }
    getData(){
        var self=this;
        store.getAllData(function(data){
            var i=0;
            var len=data.length;
            var messageListArr = [];
            for(; i<len; i++) {
                messageListArr[i] = data[i].Message;
            }
            self.setState({messageList: messageListArr});
            console.log(self.state.messageList);
        });
    }
}

ReactDom.render(
    <MessageList />,
    document.getElementById("main-container")
)