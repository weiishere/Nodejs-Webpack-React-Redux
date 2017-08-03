import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, DatePicker, Select, Row, Col } from 'antd';
import actions from './action';
import moment from 'moment';
import './style.less';
const FormItem = Form.Item;

class DetailPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.modalVisible,
        };
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
        mainProps: React.PropTypes.object.isRequired,
    }
    handleUpdate = () => {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    const fields = this.props.form.getFieldsValue();
                    let { name, birthday, height, weight, club, position, price } = fields;
                    birthday = birthday._i;
                    this.props.dispatch(actions.addPlayer({
                        name, birthday, height, weight, club, position, price
                    }, function (result) {
                        if (result.code === '0000') {

                        } else {

                        }
                    }));
                }
            },
        );
    }
    render() {
        return (
            <Modal
                title="Modal"
                visible={this.props.modalVisible}
                onOk={this.hideModal}
                onCancel={this.hideModal}
                okText="确认"
                cancelText="关闭"
            >
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
            </Modal>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {}
}

export default connect(mapStateToProps)(Form.create()(DetailPanel));