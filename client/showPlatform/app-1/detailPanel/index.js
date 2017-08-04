import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Form, Input,message, InputNumber, Button, Modal, DatePicker, Select, Row, Col } from 'antd';
import actions from './action';
import moment from 'moment';
import './style.less';
const FormItem = Form.Item;

class DetailPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.modalVisible,
            palyer: this.props.player
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
                    var self = this;
                    let { _id, name, birthday, height, weight, club, position, price } = Object.assign({}, this.props.player, fields);
                    birthday = birthday._i;
                    this.props.dispatch(actions.updatePlayer({
                        _id, name, birthday, height, weight, club, position, price
                    }, function (result) {
                        if (result.code === '0000') {
                            message.success('球员信息已经成功更新~');
                            self.props.close();
                        } else {
                            message.error('更新出现错误：'+result.error);
                        }
                    }));
                }
            },
        );
    }

    // componentWillReceiveProps() {
    //     this.setState = {
    //         palyerName: this.props.player.name
    //     }
    // }
    // shouldComponentUpdate(nextProps,nextState){
    //     debugger
    //     console.log(this);
    //     return true;
    // }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        };
        return (
            <Modal
                title={this.props.player.name}
                visible={this.props.modalVisible}
                onOk={this.handleUpdate}
                onCancel={() => this.props.close()}
                okText="确认"
                cancelText="关闭"
            >
                <Form>
                    <Row>
                        <Col span={24}>
                            <FormItem label="球员姓名"  {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    initialValue: this.props.player.name,
                                    rules: [{
                                        required: true,
                                        message: 'Player name cannot set empty',
                                    }],
                                })(
                                    <Input placeholder="player name" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="球员生日">
                                {getFieldDecorator('birthday', {
                                    initialValue: moment((new Date(this.props.player.birthday)).toLocaleDateString(), 'YYYY-MM-DD'),
                                    rules: [{
                                        required: true,
                                        message: 'Please input player birthday',
                                    }],
                                })(
                                    <DatePicker format={"YYYY-MM-DD"} />
                                    )}

                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="球员身高(cm)" {...formItemLayout}>
                                {getFieldDecorator('height',
                                    {
                                        initialValue: this.props.player.height,
                                        rules: [{
                                            required: true,
                                            message: 'Please input player height(150~250)',
                                        }],
                                    })(
                                    <InputNumber min={150} max={250} placeholder="Please input player height" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="球员体重(KG)" {...formItemLayout}>
                                {getFieldDecorator('weight',
                                    {
                                        initialValue: this.props.player.weight,
                                        rules: [{
                                            required: true,
                                            message: 'Please input player weight(40~150)',
                                        }],
                                    })(
                                    <InputNumber min={40} max={150} placeholder="Please input player weight" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="俱乐部" {...formItemLayout}>
                                {getFieldDecorator('club',
                                    {
                                        initialValue: this.props.player.club,
                                        rules: [{
                                            required: true,
                                            message: 'Please input player club',
                                        }],
                                    })(
                                    <Input placeholder="Please input player club" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="擅长位置" {...formItemLayout}>
                                {getFieldDecorator('position',
                                    {
                                        initialValue: this.props.player.position,
                                        rules: [{
                                            required: true,
                                            message: 'Please input player position',
                                        }],
                                    })(
                                    <Select style={{ width: '100%' }}>
                                        <Select.Option value="BENCH">饮水机</Select.Option>
                                        <Select.Option value="CF">中锋</Select.Option>
                                        <Select.Option value="SS">影锋</Select.Option>
                                        <Select.Option value="CMF">中前卫</Select.Option>
                                        <Select.Option value="LMF">左边前卫</Select.Option>
                                        <Select.Option value="RMF">右边前卫</Select.Option>
                                        <Select.Option value="AMF">前腰</Select.Option>
                                        <Select.Option value="DMF">后腰</Select.Option>
                                        <Select.Option value="SW">清道夫</Select.Option>
                                        <Select.Option value="LWB">左边后卫</Select.Option>
                                        <Select.Option value="RWB">右边后卫</Select.Option>
                                        <Select.Option value="CB">中后卫</Select.Option>
                                        <Select.Option value="GK">守门员</Select.Option>
                                        <Select.Option value="FREE">自由人</Select.Option>
                                        <Select.Option value="STICK">屠夫</Select.Option>
                                        <Select.Option value="MANGLER">绞肉机</Select.Option>
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="球员身价" {...formItemLayout}>
                                {getFieldDecorator('price',
                                    {
                                        initialValue: this.props.player.price,
                                        rules: [{
                                            required: true,
                                            message: 'Please input player price',
                                        }],
                                    })(
                                    <Select style={{ width: '100%' }}>
                                        <Select.Option value="0~500">0~500万</Select.Option>
                                        <Select.Option value="500~1000">500~1000万</Select.Option>
                                        <Select.Option value="1000~2000">1000~2000万</Select.Option>
                                        <Select.Option value="2000~3000">2000~3000万</Select.Option>
                                        <Select.Option value="3000~4000">3000~4000万</Select.Option>
                                        <Select.Option value="4000~5000">4000~5000万</Select.Option>
                                        <Select.Option value="5000+">5000万以上</Select.Option>
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const player = state.get('app_1_details').get("data").palyer;
    return {}
}

export default connect(mapStateToProps)(Form.create()(DetailPanel));