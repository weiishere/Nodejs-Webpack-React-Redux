import React, { Component } from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import dropMan from './dropMan.js';
import './style.less';

class DropMan extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        dropMan.init();
    }
    componentWillUnmount() {
        dropMan.removeAll();
    }
    render() {
        return (
            <div>
                <div id="canvas_dropMan">loading...</div>
            </div>
        );
    }
}

export default DropMan;