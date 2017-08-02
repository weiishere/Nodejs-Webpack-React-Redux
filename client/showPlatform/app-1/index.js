import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, DatePicker } from 'antd';
const FormItem = Form.Item;
import './style.less';

class App1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkNick: false,
        };
        //this.check = check.bind(this);
    }
    check = () => {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    console.info('success');
                }
            },
        );
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 4 },
        };

        const { getFieldDecorator } = this.props.form;
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        return (
            <div>
                新增球员
                <Form layout="inline">
                    <FormItem label="球员姓名">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: 'Please input player name',
                            }],
                        })(
                            <Input placeholder="Please input player name" />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout2} label="球员生日">
                        <DatePicker />
                    </FormItem>
                    <FormItem >
                        <Button type="primary" onClick={this.check}>新增</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {}
}

export default connect(mapStateToProps)(Form.create()(App1));