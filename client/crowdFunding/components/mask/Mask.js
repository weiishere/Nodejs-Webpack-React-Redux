import React,{Component} from 'react';
import ReactDom from 'react-dom';
import './mask.less';
class Mask extends Component{
  setMask=()=>{
    this.node=document.createElement('div');
    this.node.className='mask';
    document.body.appendChild(this.node);
  }
  resetMask=()=>{
    ReactDom.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
    this.mask=null;
  }
  renderMask=()=>{
    this.setMask();
    this.mask=ReactDom.unstable_renderSubtreeIntoContainer(this,this.props.children,this.node);
  }
  componentDidMount(){
    this.renderMask();
  }
  componentWillUnmount(){
    this.resetMask();
  }
  render(){
    return null;
  }
}
export default Mask;
