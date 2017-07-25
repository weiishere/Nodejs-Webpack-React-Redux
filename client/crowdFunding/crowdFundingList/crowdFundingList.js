import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import './style.less';
import { Form, Row, Col, Input, Button, Icon, Select, Table, Popconfirm, notification } from 'antd';
import { getProjectList, deleteProject, offlineProject } from './action';
import { fetchActions } from '../../../common/action/fetchAction';
import { getProject } from '../crowdFundingItem/action';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const FormItem = Form.Item;
const Option = Select.Option;

class CrowdFundingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: 0,
            projectCondition: " ",
            projectType: " ",
            pageNum: 1,
            //merchantId: '110034235',
            pagination: { total: 0, pageSize: this.props.pageSize, pageNum: this.props.pageNum },
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        //this.handleDelete=this.handleDelete.bind(this);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
        mainProps: React.PropTypes.object.isRequired,
    }
    handleReSet = () => {
        this.props.form.setFieldsValue({
            projectId: 0,
            projectCondition: '',
            pageSize: 10
        });
    }
    openNotificationWithIcon = (type, msg) => {
        notification[type]({ message: msg, description: '', duration: 1.5 });
    };
    handleSearch(pageNum) {
        const fields = this.props.form.getFieldsValue();
        if ((fields.projectId + "").length >= 10) {
            this.props.form.setFields({ projectId: { value: fields.projectId, errors: [new Error('项目编号输入字符过长')] } });
            return;
        } else if ((fields.projectId + "").length != 0) {
            if (isNaN(fields.projectId)) {
                this.props.form.setFields({ projectId: { value: fields.projectId, errors: [new Error('项目编号类型不合法')] } });
                return;
            } else {
                this.props.form.setFields({ value: fields.projectId, projectId: { errors: null } });
            }
        } else {
            this.props.form.setFields({ value: "", projectId: { errors: null } });
        }

        fields.pageNum = isNaN(pageNum) ? "1" : pageNum;
        fields.pageSize = parseInt(fields.pageSize);
        var query = Object.assign(this.state, fields);
        //query.pageSize=this.state.pagination.pageSize;
        query.projectId = query.projectId == "" ? 0 : query.projectId;
        query.merchantId = this.context.mainProps.merchantId;
        this.props.dispatch(getProjectList(query));

    }
    handleDelete(record) {
        let self = this;
        this.props.dispatch(deleteProject({ 'projectId': parseInt(record.projectId), belongType: record.crowdFundingConfigEntity.belongType, merchantId: this.context.mainProps.merchantId }, function (result) {
            self.handleSearch(self.props.pageNum);
            self.openNotificationWithIcon("success", result.msg);
        }));
    }
    handleOffline(record) {
        let self = this;
        this.props.dispatch(offlineProject({ 'projectId': parseInt(record.projectId), belongType: record.crowdFundingConfigEntity.belongType, merchantId: this.context.mainProps.merchantId, projectShowStatus: record.crowdFundingConfigEntity.projectShowStatus == "0" ? "1" : "0" }, function (result) {
            self.handleSearch(self.props.pageNum);
            self.openNotificationWithIcon("success", result.msg);
        }));
    }
    handleDetails(record) {
        const { router } = this.context;
        router.push({ pathname: "/crowdFunding/item/" + record.projectId + "/" + record.crowdFundingConfigEntity.belongType });
        // this.props.dispatch(getProject({'projectId':record.projectId},function(){
        //     router.push({pathname: "/crowdFunding/item/"+record.projectId});
        // }));

    }
    componentDidMount() {
        this.handleSearch(this.props.pageNum);
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const getLocalTime = (nS) => {
            return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        }
        const getProjectState = (stateCode) => {
            switch (stateCode) {
                case "0": return "已保存"; case "1": return "待审核"; case "2": return "审核驳回"; case "3": return "审核通过"; case "4": return "预热中";
                case "5": return "预热结束"; case "6": return "众筹中"; case "7": return "众筹失败"; case "8": return "众筹成功"; case "9": return "退款中";
                case "10": return "项目结束"; case "11": return "审核拒绝"; case "12": return "提交退款"; case "13": return "退款审核驳回";
                default: return "未知";
            }
        }
        const getBelongType = (code) => {
            switch (code) {
                case "SDK": return "插件";
                case "CROWDFUNDING_LIFE": return "app众筹生活页配置";
                case "CROWDFUNDING_HOME": return "app众筹首页配置";
                default: return "未知";
            }
        }
        const columns = [
            { title: '项目编号', dataIndex: 'projectId' },
            { title: '项目名称', dataIndex: 'projectName' },
            { title: '项目开始时间', dataIndex: 'projectStartTime', render: (text, record) => (<span>{getLocalTime(record.projectStartTime)}</span>) },
            { title: '项目结束时间', dataIndex: 'projectEndTime', render: (text, record) => (<span>{getLocalTime(record.projectEndTime)}</span>) },
            { title: '项目金额', dataIndex: 'amount' },
            { title: '项目状态', dataIndex: 'projectStatus', render: (text, record) => (<span>{getProjectState(record.projectStatus)}</span>) },
            { title: '上下架', dataIndex: 'crowdFundingConfigEntity.projectShowStatus', render: (text, record) => (<span>{record.crowdFundingConfigEntity.projectShowStatus == "0" ? "上架" : <font style={{ color: 'red' }}>下架</font>}</span>) },
            { title: '归属类型', dataIndex: 'crowdFundingConfigEntity.belongType', render: (text, recode) => (getBelongType(recode.crowdFundingConfigEntity.belongType)) },
            {
                title: '操作栏', render: (text, record) => (
                    <span>
                        <Button type="primary" size="small" onClick={() => this.handleDetails(record)} style={{ background: '#46C76B ', borderColor: '#46C76B ' }}>详情</Button>&nbsp;&nbsp;
                    <Popconfirm title={((projectName) => { return '确定删除项目“' + projectName + "”"; })(record.projectName)} onConfirm={() => this.handleDelete(record)} okText="确定" cancelText="取消">
                            <Button type="primary" size="small" style={{ background: '#FF3A3A ', borderColor: '#FF3A3A ' }}>删除</Button>&nbsp;&nbsp;
                    </Popconfirm>
                        <Button type="primary" size="small" onClick={() => this.handleOffline(record)} style={{ background: '#3277EC ', borderColor: '#3277EC ' }}>{record.crowdFundingConfigEntity.projectShowStatus == "0" ? "↓下架" : "↑上架"}</Button>&nbsp;&nbsp;
                </span>
                )
            },
        ];


        const data = this.props.projectList;
        //this.setState({pagination:{total:this.props.totalCount}});
        return (
            <div className="cf_wrap">
                <h1>众筹项目列表</h1>
                <div>
                    <Form
                        className="ant-advanced-search-form"
                        style={{ marginTop: 15 }}
                    >
                        <Row>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label={`项目编号`}>
                                    {getFieldDecorator('projectId', {
                                        initialValue: this.state.projectId || ""
                                        //rules: [{ required: false,type:"number", message: 'Please input your phone number!' }] 
                                    })(
                                        <Input type="text" placeholder="项目编号" onChange={this.projectIdChange} />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label={`项目状态`}>
                                    {getFieldDecorator('projectCondition', { initialValue: this.state.projectCondition })(
                                        <Select style={{ width: '100%' }}>
                                            <Option value=" ">全部</Option>
                                            <Option value="0">已保存</Option>
                                            <Option value="1">待审核</Option>
                                            <Option value="2">审核驳回</Option>
                                            <Option value="3">审核通过</Option>
                                            <Option value="4">预热中</Option>
                                            <Option value="5">预热结束</Option>
                                            <Option value="6">众筹中</Option>
                                            <Option value="7">众筹失败</Option>
                                            <Option value="8">众筹成功</Option>
                                            <Option value="9">退款中</Option>
                                            <Option value="10">项目结束</Option>
                                            <Option value="11">审核拒绝</Option>
                                            <Option value="12">提交退款</Option>
                                            <Option value="13">退款审核驳回</Option>
                                        </Select>
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...formItemLayout} label={`列表数量`}>
                                    {getFieldDecorator('pageSize', { initialValue: this.state.pagination.pageSize.toString() })(
                                        <Select style={{ width: '32%' }}>
                                            <Option value="2">2</Option>
                                            <Option value="4">4</Option>
                                            <Option value="10">10</Option>
                                        </Select>
                                    )}

                                </FormItem>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
                                <Button style={{ marginLeft: 10 }} onClick={this.handleReSet.bind(this)}>重置搜索条件</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            total: this.props.totalCount,
                            pageSize: this.props.pageSize,
                            defaultCurrent: this.state.pagination.pageNum,
                            onChange: this.handleSearch.bind(this)
                        }}
                        bordered
                    />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {

    const projectList = state.get('crowdFundingList').get("projectList").projectInfoList;
    const totalCount = state.get('crowdFundingList').get("projectList").totalCount;
    const pageSize = state.get('crowdFundingList').get("projectList").pageSize;
    const pageNum = state.get('crowdFundingList').get("projectList").pageNum;
    //console.log(projectList);
    return {
        projectList, totalCount, pageSize, pageNum
    }
}
export default connect(mapStateToProps)(Form.create()(CrowdFundingList))