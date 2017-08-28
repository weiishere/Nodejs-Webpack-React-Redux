import React, { Component } from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import game_10 from './1010.js';
import './style.less';

class Intro extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        game_10.init();
    }
    componentWillUnmount() {
        game_10.removeAll();
    }
    render() {
        return (
            <div>
                <div id="canvas">loading...</div>
                <audio controls="controls" src="/sound/1010/3.wav" id="s_dropIn" controls="controls" preload="auto" style={{display:'none'}}></audio>
                <audio controls="controls" src="/sound/1010/s_dropInFail.wav" id="s_dropInFail" controls="controls" preload="auto" style={{display:'none'}}></audio>
                <audio controls="controls" src="/sound/1010/s_getScore.wav" id="s_getScore" controls="controls" preload="auto" style={{display:'none'}}></audio>
                <audio controls="controls" src="/sound/1010/s_gameover.wav" id="s_gameover" controls="controls" preload="auto" style={{display:'none'}}></audio>
            </div>
        );
    }
}

export default Intro;