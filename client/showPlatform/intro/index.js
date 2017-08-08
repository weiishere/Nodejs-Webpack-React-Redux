import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PageCommon from './PageCommon';
import $ from 'jquery';
import './style.less';

class Intro extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        PageCommon.init("page1", { defaultTransition: "slider" });
        var page1 = new PageCommon.Page("page1", {
            init: function () {
                console.log(this.id + " has init");
            },
            next: function () {
                console.log(this.id + " has next");
                page2.show();
            },
            slideAfter: function () { console.log(this.id + " has slideAfter"); }
        });
        var page2 = new PageCommon.Page("page2", {
            next: function () {
                page3.show();
            },
            slideAfter: function () { console.log(this.id + " has slideAfter"); }
        });
        var page3 = new PageCommon.Page("page3", {
            next: function () {
                page4.show();
            },
        });
        var page4 = new PageCommon.Page("page4", {
            next: function () {
                page5.show();
            },
        });
        var page5 = new PageCommon.Page("page5", {
            next: function () {
                page6.show();
            },
        });
        var page6 = new PageCommon.Page("page6", {
            next: function () {
                page1.show();
            },
        });
    }
    render() {
        return (
            <div className='pagersWrapper'>
                <div className="pages">
                    <div className="page" id="page1">
                        <header>
                            <h1>认识React</h1>
                            <button role='right'>Next</button>
                        </header>
                        <section>
                            <ul className='mainUl'>
                                <li>React 是 Facebook 推出的一个用来构建用户界面的 JavaScript 库</li>
                                <li>作为 MVC 架构的 V 层</li>
                                <li>虚拟 DOM：diff算法
                                    <br />
                                    <i>
                                        1：通过diff寻找到要变更的DOM节点，再把修改更新到浏览器实际的DOM节点上，不是真的渲染整个DOM树。Virtual DOM是一个纯粹的JS数据结构（内存数据），所以性能会比原生 DOM 快很多<br />
                                        2：性能优化（使用key值、减少重复渲染对比）
                                    </i>
                                </li>
                                <li>由有状态的组件嵌套
                                    <br />
                                    <i>
                                        props与state
                                    </i>
                                </li>
                                <li>React 实现了单向响应的数据流，从而减少了重复代码
                                    <br />
                                    <i>
                                        从父组件传递到子组件，易于把握，子组件只需从父组件获取props渲染即可，如果顶层组件的某个prop改变饿了，React会递归的向下便利整棵组件树，重新渲染所有使用这个属性的组件
                                    </i>
                                </li>
                                <li>JSX语法
                                    <br />
                                    <i>
                                        1：React引入虚拟DOM以后，创建DOM树得在JS中完成，这使得界面定义变得相当繁琐，需要一个声明式的HTML<br />
                                        2：HTML 直接嵌入了 JS 代码里面,让前端实现真正意义上的组件化成为了可能</i>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="page" id="page2">
                        <header>
                            <button role='back'>Back</button>
                            <h1>Diff算法</h1>
                            <button role='right'>Next</button>
                        </header>
                        <section>
                            <div style={{ margin: '10px' }}>
                                Web界面由DOM树来构成，当其中某一部分发生变化时，其实就是对应的某个DOM节点发生了变化。在React中，构建UI界面的思路是由当前状态决定界面。前后两个状态就对应两套界面，然后由React来比较两个界面的区别，这就需要对DOM树进行Diff算法分析<br />
                                主要分为不同节点类型、相同类型节点、列表节点的比较
                                1：React中，树的算法其实非常简单，那就是两棵树只会对同一层次的节点进行比较，当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个DOM树的比较。<br />
                                <img style={{ width: '60%' }} src='/image/0007.png' /><br />
                                <img style={{ width: '60%' }} src='/image/0008.png' /><br />
                                2：React会对属性进行重设从而实现节点的转换
                                3：React会逐个对节点进行更新，转换到目标节点。而最后插入新的节点E，涉及到的DOM操作非常多。而如果给每个节点唯一的标识（key），那么React能够找到正确的位置去插入新的节点<br />
                                <img style={{ width: '60%' }} src='/image/0009.png' /><br />
                                <img style={{ width: '60%' }} src='/image/0010.png' /><br />
                            </div>
                        </section>
                    </div>
                    <div className="page" id="page3">
                        <header>
                            <button role='back'>Back</button>
                            <h1>React的生命周期</h1>
                            <button role='right'>Next</button>
                            <section>
                                <div style={{ margin: '10px' }}>
                                    1：首次挂载到DOM（挂载到DOM流程在组件的整个生命周期只有一次，也就是组件第一次插入DOM文档流时。在挂载到DOM流程中的每一步也有相应的限制：
                                    getDefaultProps()和getInitialState()中不能获取和设置组件的state。
                                    render()方法中不能设置组件的state）<br />
                                    <p style={{ textAlign: "center" }}><img src='/image/1112.png' /></p>
                                    2：更新DOM（componentWillReceiveProps()提供了该流程中更新state的最后时机，渲染优化：在非必要的时候将shouldComponentUpdate返回值设置为false）<br />
                                    <p style={{ textAlign: "center" }}><img src='/image/1113.png' /></p>
                                </div>
                            </section>
                        </header>
                        <section>

                        </section>
                    </div>
                    <div className="page" id="page4">
                        <header>
                            <button role='back'>Back</button>
                            <h1>虚拟DOM的意义</h1>
                            <button role='right'>Next</button>
                        </header>
                        <section>
                            <div style={{ margin: '10px' }}>
                                之所以引入虚拟DOM，一方面是性能的考虑。Web应用和网站不同，一个Web应用 中通常会在单页内有大量的DOM操作，而这些DOM操作很慢。<br />
                                在React中，应用程序在虚拟DOM上操作，这让React有了优化的机会。简单说， React在每次需要渲染时，会先比较当前DOM内容和待渲染内容的差异， 然后再决定如何最优地更新DOM。这个过程被称为reconciliation。<br />
                                除了性能的考虑，React引入虚拟DOM更重要的意义是提供了一种一致的开发方 式来开发服务端应用、Web应用和手机端应用：<br />
                                <img src='/image/0006.png' /><br />
                                因为有了虚拟DOM这一层，所以通过配备不同的渲染器，就可以将虚拟DOM的内容 渲染到不同的平台。
                            </div>
                        </section>
                    </div>
                    <div className="page" id="page5">
                        <header>
                            <button role='back'>Back</button>
                            <h1>React-redux</h1>
                            <button role='right'>Next</button>
                        </header>
                        <section>
                            <div style={{ margin: '10px' }}>
                                对于大型的复杂应用来说，必须具备代码结构和组件之间的通信能力，这是React暂时没涉及到的地方，作为补充，2014年 Facebook 提出了 Flux 架构的概念，引发了很多的实现。2015年，Redux 出现，将 Flux 与函数式编程结合一起，很短时间内就成为了最热门的前端架构<br />

                                基本思想是保证数据的单向流动，同时便于控制、使用、测试。<br />

                                三大原则：单一数据源、State 是只读的、使用纯函数来执行修改<br />
                                1：整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。<br />
                                2：唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象<br />
                                3：为了描述 action 如何改变 state tree ，你需要编写 reducers。<br /><br />
                                <img src='/image/1121.png' />
                            </div>
                        </section>
                    </div>
                    <div className="page" id="page6">
                        <header>
                            <button role='back'>Back</button>
                            <h1>react-redux模型</h1>
                            <button role='right'>Home</button>
                        </header>
                        <section>
                            <div style={{ margin: '10px' }}>
                                <img src='/image/1116.png' />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;