import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { combineReducers } from 'redux-immutable';
import { Route, IndexRoute } from 'react-router';
import { Layout } from 'antd';
import SideBar from './components/sideBar';
import './layout.less'

const { Header, Footer, Content, Sider } = Layout;

class Frame extends Component {
    constructor(options) {
        super(options);
    }
    static childContextTypes = {
        mainProps: React.PropTypes.object.isRequired
    }
    getChildContext() {
        return {
            mainProps: this.props
        }
    }
    render() {
        const _height = (window.innerHeight - 120) + 'px';
        const contentStyle = {
            minHeight: _height,
            width: '82%',
            padding: '1%',
            overflow: 'auto',
            display: "inline-block",
            borderLeft: 'solid 1px #ccc'
        }
        return (
            <Layout>
                <Header style={{ height: '50px', backgroundColor: "#23252B", padding: '0 5px' }}>
                    <div style={{ position: 'absolute', top: 5, color: '#fff', zIndex: 10000, height: 25, lineHeight: '25px' }}>
                        <div>
                            <img src='//img14.360buyimg.com/wympay/jfs/t3748/300/108123672/4451/c42d7358/57ff5e34N6e63c570.png' />
                        </div>
                    </div>
                </Header>

                <Content style={{ boxShadow: '0 0 5px #ccc', padding: '0 20px' }}>
                    <Layout>
                        <Sider style={{ width: '15%', display: "inline-block", verticalAlign: 'top' }}>
                            <SideBar />
                        </Sider>
                        <Content style={contentStyle}>
                            {this.props.children}
                        </Content>

                    </Layout>
                </Content>
                <Footer className='footer'>版权莫有，侵权随意</Footer>
            </Layout>

        )
    }
}

const mapStateToProps = function (state) {
    return {}
}

export default connect(mapStateToProps)(Frame);