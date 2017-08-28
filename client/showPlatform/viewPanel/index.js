import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Form, message, Input, InputNumber, Button, Checkbox, DatePicker, Select, Table, Row, Col, Popconfirm, Spin } from 'antd';
import './style.less';
import viewPanel from './viewPanel.js';

const FormItem = Form.Item;

class ViewPanel extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        viewPanel.init();
    }
    componentWillUnmount() {
        viewPanel.removeAll();
    }
    render() {
        return (
            <div>
                <div id="canvas_vp">loading...</div>
            </div>
        );
    }
}
export default ViewPanel;