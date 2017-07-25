
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import './sidebar.less';
import {Menu,Icon} from 'antd';
import { connect } from 'react-redux';
import { browserHistory ,hashHistory} from 'react-router';
import { setMenu} from '../../../../common/action/caches';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideBar extends Component{
  static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    // state = {
    //   current: this.props.menukey,
    // }
  handleClick = (e) => {
    const { router } = this.context; 
    if(e.key){
      //if(e.key=="crowdFunding/item"){retrn;}
      router.push({pathname: e.key});
      this.props.dispatch(setMenu(e.key));
    }
  }
  componentDidMount() {
    this.props.dispatch(setMenu(location.href.split('fas-sys')[1]));
  }
  render(){
    return (
      <Menu
        onClick={this.handleClick.bind(this)}
        selectedKeys={[this.props.menukey]}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<h2>京东众筹</h2>}>
          <Menu.Item key="">众筹订单查询</Menu.Item>
          <Menu.Item key="/crowdFunding">众筹项目列表</Menu.Item>
          {/*<Menu.Item key="crowdFunding/item"><a href="/fas-sys/crowdFunding/item">新增众筹项目</a></Menu.Item>*/}
          <Menu.Item key="/crowdFunding/item">新增众筹项目</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
function mapStateToProps(state, ownProps) {
    const menukey = state.get('caches').get("menukey");
    return {
        menukey
    }
}
export default connect(mapStateToProps)(SideBar);
