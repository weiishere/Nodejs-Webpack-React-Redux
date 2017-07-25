import promise from 'es6-promise';
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Route, IndexRoute} from 'react-router';
import Root from '../../Root';
import CrowdFundingList from './crowdFundingList/crowdFundingList';
import CrowdFundingItem from './crowdFundingItem/crowdFundingItem';
import Frame from './frame';
import reducers from './reducer';

const WrapVersionInfo=(WrappedComponent)=>{
  return class extends Component{
    render(){
      return <WrappedComponent {...this.props}></WrappedComponent>
    }
  }
}
// Promise 兼容性处理
promise.polyfill();
const routes = (
  <Route path="/crowdFunding" component={Frame}>
    <IndexRoute component={CrowdFundingList }/>
    <Route path="item" component={CrowdFundingItem }></Route>
    <Route path="item/:id/:belongType" component={CrowdFundingItem }></Route>
  </Route>
  
);
render(
  <Root routes={routes} reducers={reducers} basename="/fas-sys"/>,
  document.getElementById('layout')
);
