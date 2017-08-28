import React, { Component } from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import tetris from './tetris.js';
import './style.less';

class Tetris extends Component {
    constructor(props) {
        super(props);
        this.tetrisComm;
    }
    componentDidMount() {
        this.tetrisComm = tetris();
        this.tetrisComm.begin(60);
    }
    componentWillUnmount() {
        this.tetrisComm.clear();
    }
    render() {
        return (
            <div className='TetrisWapper'>
                <canvas id="canvas" height="630" width="400" style={{ background: '#333', margin: '0 auto' }}></canvas><br /><br />
            </div>
        );
    }
}

export default Tetris;