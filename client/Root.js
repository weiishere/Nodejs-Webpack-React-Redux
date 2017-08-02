import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux-fixed'
import Immutable from 'immutable';

//开发环境
let DevTools, createLogger;
if (process.env.NODE_ENV === 'development') {
    const createDevTools = require('redux-devtools').createDevTools;
    const LogMonitor = require('redux-devtools-log-monitor').default;
    const DockMonitor = require('redux-devtools-dock-monitor').default;
    createLogger = require('redux-logger');

    DevTools = createDevTools(
        <DockMonitor toggleVisibilityKey="ctrl-h"
            changePositionKey="ctrl-w"
            defaultIsVisible={false}
            defaultPosition="right">
            <LogMonitor theme="tomorrow" preserveScrollTop={false} />
        </DockMonitor>
    );
}

/**
 * 配置 store
 * @param history
 * @param reducers
 * @param initialState
 * @returns {*}
 */
export function configureStore(history, reducers, initialState) {

    // Installs hooks that always keep react-router and redux store in sync
    const middleware = [thunk, routerMiddleware(history)];
    if (createLogger) { //开发环境
        middleware.push(createLogger());
    }

    let devTools = [];
    if (DevTools && typeof document !== 'undefined') {
        devTools = [DevTools.instrument()]
    }

    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...devTools
        ));

    return store;
}

/**
 * Create enhanced history object for router
 * 使用 Immutable 后，需要重写该方法，替换 syncHistoryWithStore 中的默认 selectLocationState
 * 详情看源代码
 * @returns {function(*)}
 */
function createSelectLocationState() {
    let prevRoutingState, prevRoutingStateJS;
    return (state) => {
        const routingState = state.get('routing'); // or state.routing
        if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }
        return prevRoutingStateJS;
    };
}

const Root = ({ routes, reducers, basename }) => {
    // 路由转换配置
    // Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
    const browserHistory = useRouterHistory(createBrowserHistory)({
        basename: basename ? basename : '/'
    });
    //初始化 store
    const store = configureStore(browserHistory, reducers, Immutable.fromJS({}));
    const history = syncHistoryWithStore(browserHistory, store, {
        selectLocationState: createSelectLocationState(),
        adjustUrlOnReplay: true
    });

    const _routes = typeof routes === 'function' ? routes(store) : routes;
    return DevTools ?
        (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router history={history} routes={routes}>
                        {_routes}
                    </Router>
                    <DevTools />
                </div>
            </Provider>
        )
        :
        (
            <Provider store={store}>
                <Router history={history}>
                    {_routes}
                </Router>
            </Provider>
        );
};

Root.propTypes = {
    routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    reducers: PropTypes.func,
    basename: PropTypes.string
};

export default Root;

// 方便性能调试
// if (process.env.NODE_ENV === 'development') {
//     const Perf = require('react-addons-perf');
//     /**
//      * Perf.start()
//      * Perf.stop()
//      * Perf.printInclusive()
//      */
//     window.Perf = Perf;
// }