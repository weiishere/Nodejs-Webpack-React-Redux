import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Spin, message } from 'antd';
//import { visibleVersionList} from './version-info/modules/version-list/action';
import {clearMsg} from '../../common/action/fetchAction';
const { Header, Footer, Content, Sider } = Layout;
import './layout.less';
import Mask from './components/mask/Mask';
import SideBar from './components/sideBar/SideBar';
import {merchantIdInject} from '../index/hoc/merchantIdInject';

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
  componentDidUpdate() {
    let msg = this.props.fetchStatus.get("message");
    let code = this.props.fetchStatus.get("code");
    if (code != "00000" && msg != "") {
      message.error(msg + (code == "" ? "" : "（" + code + "）"));
      this.props.dispatch(clearMsg());
    }
  }
  render() {
    const { children } = this.props;
    const { fetchStatus } = this.props;
    const height = '100%';
    const style = {
      height: height
    }
    const _height = 'calc(100% - 80px)';
    const __height = (window.innerHeight - 120) + 'px';
    const contentStyle = {
      minHeight: __height,
      width: '90%',
      background: '#fff',
      overflow: 'auto'
    }
    return (
      <Layout>
        <Header style={{ height: '80px', backgroundColor: "#23252B", padding: '0 20px' }}>
          <div style={{ position: 'absolute', top: 26, color: '#fff', zIndex: 10000, height: 25, lineHeight: '25px' }}>
            <div>
              <img src='//img14.360buyimg.com/wympay/jfs/t3748/300/108123672/4451/c42d7358/57ff5e34N6e63c570.png'/>
            </div>
            {/*<font style={{ opacity: 0.3 }}>|</font>&nbsp;&nbsp;&nbsp;企业服务平台*/}
          </div>
          <iframe src="http://172.25.50.13:8888/account/statusbar/" id='statusbar' name='statusbar'
            style={{ position: 'absolute', top: 25, left: 0, right: 0, backgroundColor: 'rgba(52,53,58,1)', padding: 0, border: 0 }} width='100%' height='30px' frameBorder='no'>
          </iframe>
        </Header>

        <Content style={{ padding: '20px', boxShadow: '0 0 5px #ccc', }}>
          <Layout style={{ background: '#fff' }}>

            <Sider width={200} style={{ background: '#fff', borderRight: 'solid 1px #e9e9e9' }}>
              <SideBar />
            </Sider>
            <Content style={contentStyle}>
              {children}
            </Content>
            <Footer style={{ display: 'none' }}></Footer>
          </Layout>
        </Content>
        {fetchStatus.get('count') !== 0 ? <Mask>
          <Spin size='large' tip="Loading..."></Spin>
        </Mask> : null}
      </Layout>
    )
  }
}
const mapStateToProps = function (state) {
  const fetchStatus = state.get('fetchStatus');
  return {
    fetchStatus
  }
}
export default connect(mapStateToProps)(merchantIdInject(Frame));