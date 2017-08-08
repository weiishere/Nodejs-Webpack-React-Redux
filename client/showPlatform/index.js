import promise from 'es6-promise';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { combineReducers } from 'redux-immutable';
import { Route, IndexRoute } from 'react-router';
import Frame from './frame';
import App_1 from './app-1';
import Intro from './intro'
import Root from '../Root';
import Cake from './cake';
import Game_10 from './1010';
import reducers from './reducers';

 
//promise兼容性处理
promise.polyfill();
const routes = (
    <Route path="/showPlatform" component={Frame}>
        <IndexRoute component={App_1}/>
        <Route path="app_1" component={App_1 }></Route>
        <Route path="intro" component={Intro }></Route>
        <Route path="cake" component={Cake }></Route>
        <Route path="cake" component={Cake }></Route>
        <Route path="1010" component={Game_10 }></Route>
    </Route>
)
render(
    <Root routes={routes} reducers={reducers} basename='/' />,
    document.getElementById('layout')
)