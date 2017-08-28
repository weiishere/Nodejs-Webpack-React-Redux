import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style.less';
import actions from './action'
import { connect } from 'react-redux';
import $ from 'jquery';

class SideBar extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    handleClick = (e) => {
        const { router } = this.context;
        const key = e.target.getAttribute('value');
        if (key) {
            router.push({ pathname: "/showPlatform/" + key });
            //this.props.dispatch(setMenu(e.key));
        }
        this.props.dispatch(actions.selectMenuItem(key));
    }
    componentDidUpdate() {
        $(".menuWrap a").removeClass("active");
        $(".menuWrap a[value*='" + this.props.theKey + "']").addClass('active');
    }
    render() {
        return (
            <aside className='menuWrap'>
                <nav>
                    <a href="javascript:;" className='active' onClick={this.handleClick} value='intro'>简要介绍</a>
                    <a href="javascript:;" onClick={this.handleClick} value='app_1'>react-redux-mongodb</a>
                    <a href="javascript:;" onClick={this.handleClick} value='cake'>接月饼游戏</a>
                    <a href="javascript:;" onClick={this.handleClick} value='1010'>1010游戏</a>
                    <a href="javascript:;" onClick={this.handleClick} value='tetris'>俄罗斯方块</a>
                    <a href="javascript:;" onClick={this.handleClick} value='dropMan'>100层</a>
                    <a href="javascript:;" onClick={this.handleClick} value='viewPanel'>画布图表组件</a>
                    
                </nav>
            </aside>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const theKey = state.get('sideBar').get("data").key;
    console.log(theKey);
    return { theKey }
}

export default connect(mapStateToProps)(SideBar);