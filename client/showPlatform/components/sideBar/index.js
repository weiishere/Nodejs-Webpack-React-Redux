import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style.less';
import { connect } from 'react-redux';

class SideBar extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (e) => {
        const { router } = this.context;
        const key = e.target.getAttribute('value');
        if (key) {
            router.push({ pathname: key });
            //this.props.dispatch(setMenu(e.key));
        }
    }
    render() {
        return (
            <aside className='menuWrap'>
                <nav>
                    <a href="javascript:;" onClick={this.handleClick} value='/showPlatform/intro'>简要介绍</a>
                    <a href="javascript:;" onClick={this.handleClick} value='/showPlatform/app_1'>react-redux-mongodb</a>
                    <a href="javascript:;" onClick={this.handleClick} value='/showPlatform/cake'>接月饼游戏</a>
                    <a href="javascript:;" onClick={this.handleClick} value='/showPlatform/1010'>1010游戏</a>
                    <a href="#">原生canvas俄罗斯方块</a>
                    <a href="#">SVG饼图组件</a>
                    <a href="#">iconFont</a>
                </nav>
            </aside>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {}
}

export default connect(mapStateToProps)(SideBar);