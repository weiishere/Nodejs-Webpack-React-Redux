import React, { Component } from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import cake from './cake.js';
import './style.less';

class Cake extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        cake.init();
    }
    componentWillMount(){
        cake.removeAll();
    }
    render() {
        return (
            <div>
                <div id="canvas">loading...</div>
            </div>
        );
    }
}

export default Cake;