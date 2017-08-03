import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, DatePicker, Select, Table, Row, Col, Popconfirm } from 'antd';
import actions from './action';
import moment from 'moment';
import DetailPanel from './detailPanel';
import './style.less';

const FormItem = Form.Item;

class App1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            showPlayer: {}
        };
        this.handleAdd = this.handleAdd.bind(this);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
        mainProps: React.PropTypes.object.isRequired,
    }
    handleAdd = () => {
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
    handleDelete(record) {
        this.props.dispatch(actions.removePlayer(record._id, function (result) {

        }));
    }
    handleDetails(record){
        this.setState({modalVisible:true});
    }
    handleSearch(pageNum) {
        this.props.dispatch(actions.getPalyerList());
    }
    componentDidMount() {
        this.handleSearch();
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        }; (new Date()).getUTCDate
        const columns = [
            { title: '姓名', dataIndex: 'name' },
            { title: '球员生日', dataIndex: 'birthday', render: (text, record) => (new Date(record.birthday)).toLocaleDateString().replace(/\//g, '-') },
            { title: '球员身高(cm)', dataIndex: 'height' },
            { title: '球员体重(kg)', dataIndex: 'weight', },
            { title: '俱乐部', dataIndex: 'club' },
            { title: '擅长位置', dataIndex: 'position' },
            { title: '球员身价(GBP)', dataIndex: 'price' },
            {
                title: '操作栏', render: (text, record) => (
                    <span>
                        <Button type="primary" size="small" onClick={() => this.handleDetails(record)} style={{ background: '#46C76B ', borderColor: '#46C76B ' }}>详情</Button>&nbsp;&nbsp;
                        <Popconfirm title={((name) => { return '确定删除球员：“' + name + "”"; })(record.name)} onConfirm={() => this.handleDelete(record)} okText="确定" cancelText="取消">
                            <Button type="primary" size="small" style={{ background: '#FF3A3A ', borderColor: '#FF3A3A ' }}>删除</Button>&nbsp;&nbsp;
                        </Popconfirm>
                    </span>
                )
            },
        ];
        return (
            <div>
                <div className='wrapperItem'>
                    <h2>新增球员</h2>
                    <Form>
                        <Row gutter={2}>
                            <Col span={6}>
                                <FormItem label="球员姓名" {...formItemLayout}>
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input player name',
                                        }],
                                    })(
                                        <Input placeholder="Please input player name" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem {...formItemLayout} label="球员生日">
                                    {getFieldDecorator('birthday', {
                                        initialValue: moment('1988-01-01', 'YYYY-MM-DD'),
                                        rules: [{
                                            required: true,
                                            message: 'Please input player birthday',
                                        }],
                                    })(
                                        <DatePicker format={"YYYY-MM-DD"} />
                                        )}

                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="球员身高(cm)" {...formItemLayout}>
                                    {getFieldDecorator('height',
                                        {
                                            initialValue: 180,
                                            rules: [{
                                                required: true,
                                                message: 'Please input player height',
                                            }],
                                        })(
                                        <Input placeholder="Please input player height" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="球员体重(kg)" {...formItemLayout}>
                                    {getFieldDecorator('weight', {
                                        initialValue: 80,
                                        rules: [{
                                            required: true,
                                            message: 'Please input player weight',
                                        }],
                                    })(
                                        <Input placeholder="Please input player weight" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={2}>
                            <Col span={6}>
                                <FormItem label="球队(俱乐部)" {...formItemLayout}>
                                    {getFieldDecorator('club', {
                                        initialValue: "Arsenal",
                                        rules: [{
                                            required: true,
                                            message: 'Please input player club',
                                        }],
                                    })(
                                        <Input placeholder="Please input player club" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem {...formItemLayout} label='擅长位置'>
                                    {getFieldDecorator('position', { initialValue: "BENCH" })(
                                        <Select style={{ width: '100%' }}>
                                            <Option value="BENCH">饮水机</Option>
                                            <Option value="CF">中锋</Option>
                                            <Option value="SS">影锋</Option>
                                            <Option value="LMF">左边前卫</Option>
                                            <Option value="RMF">右边前卫</Option>
                                            <Option value="AMF">前腰</Option>
                                            <Option value="DMF">后腰</Option>
                                            <Option value="SW">清道夫</Option>
                                            <Option value="LWB">左边后卫</Option>
                                            <Option value="RWB">右边后卫</Option>
                                            <Option value="CB">中后卫</Option>
                                            <Option value="GK">守门员</Option>
                                            <Option value="FREE">自由人</Option>
                                            <Option value="STICK">屠夫</Option>
                                            <Option value="MANGLER">绞肉机</Option>
                                        </Select>
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem {...formItemLayout} label='球员身价(GBP)'>
                                    {getFieldDecorator('price', { initialValue: "0~500" })(
                                        <Select style={{ width: '100%' }}>
                                            <Option value="0~500">0~500万</Option>
                                            <Option value="500~1000">500~1000万</Option>
                                            <Option value="1000~2000">1000~2000万</Option>
                                            <Option value="2000~3000">2000~3000万</Option>
                                            <Option value="3000~4000">3000~4000万</Option>
                                            <Option value="4000~5000">4000~5000万</Option>
                                            <Option value="5000+">5000万以上</Option>
                                        </Select>
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem>
                                    <Button icon="plus-circle-o" style={{ marginLeft: 20 }} type="primary" onClick={this.handleAdd}>新增</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className='wrapperItem' style={{ marginTop: '13px' }}>
                    <h2>查询结果</h2>
                    <div style={{ margin: '20px 0' }}>
                        <Table
                            rowKey={record => record._id}
                            columns={columns}
                            dataSource={this.props.playerList}
                            columns={columns}
                        />
                    </div>
                </div>
                <DetailPanel modalVisible={this.state.modalVisible} player={this.state.showPlayer} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const playerList = state.get('app_1').get("data").palyerList;
    return { playerList }
}

export default connect(mapStateToProps)(Form.create()(App1));