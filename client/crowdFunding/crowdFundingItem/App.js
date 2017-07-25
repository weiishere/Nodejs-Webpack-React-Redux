import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout ,Spin} from 'antd';
import { visibleVersionList} from './version-info/modules/version-list/action';
const {Header, Footer, Content} = Layout;
import Mask from './components/mask/Mask';
class App extends Component {
  constructor(options) {
    super(options);
    this.showVersionList = this.showVersionList.bind(this);
  }
  showVersionList(){
    const {dispatch}=this.props;
    dispatch(visibleVersionList(true));
  }
  render() {
    const { children } = this.props;
    const {fetchStatus}= this.props;
    const height='100%';
    const style={
      height:height
    }
    const _height='calc(100% - 80px)';
    const __height=(window.innerHeight-80)+'px';
    const contentStyle={
      height:__height,
      height:_height
    }
    return (
      <Layout style={style}>
        <Header style={{height:'80px',backgroundColor:"#23252B",padding:'0 20px' }}>
          <div style={{position:'absolute' ,top:26,color:'#fff',zIndex:10000,height:25,lineHeight:'25px'}}>
            <div style={{width:15,height:15,float:'left',margin:'5px 20px 0 0',cursor:'pointer',background:'url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0AgMAAAC4FvN4AAAACVBMVEUAAAD///////9zeKVjAAAAAnRSTlMAvcNDAgkAAAAmSURBVCjPY1i1aiUDQxaEWDWoeKGhoQwIgs4A1fbRcBkC4YLCAwD877r1brunfgAAAABJRU5ErkJggg==\")',
            backgroundSize:'100% 100%'}} onClick={this.showVersionList}></div>
            <font style={{opacity:0.3}}>|</font>&nbsp;&nbsp;&nbsp;直销银行-基金超市v1.0
          </div>
          <iframe src="http://172.25.50.13:8888/account/statusbar/" id='statusbar' name='statusbar'
            style={{ position: 'absolute', top: 25, left: 0, right: 0, backgroundColor: 'rgba(52,53,58,1)', padding: 0, border: 0 }} width='100%' height='30px' frameBorder='no'>
          </iframe>
        </Header>
        <Content style={contentStyle}>
          {children}
        </Content>
        <Footer style={{ display: 'none' }}></Footer>
        {fetchStatus.get('count')!==0?<Mask>
          <Spin size='large'></Spin>
        </Mask>:null}
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
export default connect(mapStateToProps)(App);