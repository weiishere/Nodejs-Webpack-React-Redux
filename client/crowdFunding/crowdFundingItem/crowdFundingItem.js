import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import './style.less';
import { getProject, initAddProject, getSingleProject, addProject } from './action'
import { startRequest } from '../../../common/action/fetchAction'
import { Form, Row, Col, Input, Button, Icon, Select, Tooltip, AutoComplete, Radio, Progress, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

class CrowdFundingItem extends Component {
    constructor(props) {
        super(props);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
        mainProps: React.PropTypes.object.isRequired,
    }
    // getDefaultProps=()=> {
    //     debugger
    //     console.log(this.props);
    //     return {};
    // }
    // checkConfirm = (rule, value, callback) => {
    //     const form = this.props.form;
    //     if (value && this.state.confirmDirty) {
    //         form.validateFields(['confirm'], { force: true });
    //     }
    //     callback();
    // }
    handleReSetEmply = () => {
        this.props.parent.form.setFieldsValue({
            projectId: "",
            projectName: "",
            beginTime: ""
        });
    }
    openNotificationWithIcon = (type, msg) => {
        notification[type]({
            message: msg,
            description: '',
        });
    };
    getItemDetais = () => {
        const fields = this.props.parent.form.getFieldsValue();
        let self = this;
        if (fields.projectId) {
            const fields = this.props.parent.form.getFieldsValue();
            if ((fields.projectId + "").length >= 10) {
                this.props.parent.form.setFields({ projectId: { value: fields.projectId, errors: [new Error('项目编号输入字符过长')] } });
                return;
            } else if ((fields.projectId + "").length != 0) {
                if (isNaN(fields.projectId)) {
                    this.props.parent.form.setFields({ projectId: { value: fields.projectId, errors: [new Error('项目编号类型不合法')] } });
                    return;
                }
            }
            this.props.parent.form.setFields({ value: "", projectId: { errors: null } });
            this.props.parent.dispatch(getSingleProject({ 'projectId': fields.projectId,'belongType':fields.belongType, merchantId: this.context.mainProps.merchantId }, function (result) {
                if (result.code != "00000") {
                    self.openNotificationWithIcon("error", result.msg);
                }
            }));
        }

    }
    projectIdBlur = (e) => {
        this.getItemDetais();
    }
    hendleAddProject = () => {
        let self = this;
        const fields = this.props.parent.form.getFieldsValue();
        if (!this.state.isCheck) {
            this.props.parent.form.setFields({ value: "", projectId: { errors: [new Error('请先输入正确的项目编号并获取项目信息')] } });
            return;
        }
        if (fields.extentionUrl.length == 0 || fields.extentionUrl.length >= 100) {
            this.props.parent.form.setFields({ extentionUrl: { value: fields.extentionUrl, errors: [new Error('项目推广链接输入有误（请勿置空且字符不超过100）')] } });
            return;
        }
        this.props.parent.form.setFields({ value: fields.extentionUrl, extentionUrl: { errors: null } });




        let {
                projectId, beginTime, endTime, projectName, extensionUrl,
            projectType, projectShowStatus, merchantId, projectStatus, amount, belongType } = this.props.parent.projectItem;
        extensionUrl = fields.extentionUrl;
        projectShowStatus = fields.projectShowStatus;
        merchantId = this.context.mainProps.merchantId;
        projectType = projectType || ' ';
        belongType = fields.belongType || 'SKD';
        this.props.parent.dispatch(addProject({
            projectId, beginTime, endTime, projectName,
            extensionUrl, projectType, projectShowStatus, merchantId, projectStatus, amount, belongType
        }, function (result) {
            self.openNotificationWithIcon((result.code == "00000" ? "success" : "error"), result.msg);
        }));
    }
    getLocalTime = (nS) => {
        return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
    render() {
        //console.log(this.props);
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.parent.form;
        if (!this.props.parent.routeParams.id) {
            let item = this.props.parent.projectItem;
            //如果是查询action的话，应该不会存在record，存在的话可能是查看详情之后第二次进入，即需要清空
            if (this.props.parent.record) {
                this.state = {
                    mode: 'add',
                    collectedAmount: "-",
                    progress: "-",
                    remainTime: "-天",
                    isCheck: false,
                    belongType: "SDK",
                    projectShowStatus: "0"
                }
            } else {
                this.state = {
                    mode: 'add',
                    projectId: item ? item.projectId : "",
                    projectName: item ? item.projectName : "",
                    beginTime: item ? this.getLocalTime(item.beginTime) : "",
                    endTime: item ? this.getLocalTime(item.endTime) : "",
                    amount: item ? item.amount : "0",
                    collectedAmount: item ? item.collectedAmount : "-",
                    minStallAmount: item ? item.minStallAmount : 0,
                    remainTime: item ? item.remainTime : "-天",
                    projectListImg: item ? item.projectListImg : "",
                    progress: (item ? (item.amount == 0 ? "-" : (parseInt(item.collectedAmount * 100 / item.amount))) : "-"),
                    projectShowStatus: "0",
                    belongType: "SDK",
                    isCheck: item ? true : false
                }
            }

        } else {
            let item = this.props.parent.projectItem;
            const record = this.props.parent.record;
            this.state = {
                mode: 'details',
                projectId: this.context.router.params.id,
                projectName: item ? item.projectName : "",
                beginTime: item ? this.getLocalTime(item.beginTime) : "",
                endTime: item ? this.getLocalTime(item.endTime) : "",
                amount: item ? item.amount : "0",
                collectedAmount: item ? item.collectedAmount : "-",
                minStallAmount: item ? item.minStallAmount : 0,
                remainTime: item ? item.remainTime : "-天",
                projectListImg: item ? item.projectListImg : "",
                extentionUrl: record ? record.extentionUrl : "",
                projectShowStatus: record ? record.projectShowStatus : "",
                belongType: this.context.router.params.belongType,
                progress: (item ? (item.amount == 0 ? "-" : (parseInt(item.collectedAmount * 100 / item.amount))) : "-")
            }
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const searchWrap = (function () {
            if (!this.context.router.params.id) {
                return <FormItem {...formItemLayout} label={`查询项目详情`}>
                    <Button type="primary" onClick={this.getItemDetais}>查询</Button>
                </FormItem>
            }
        }.bind(this))();
        const footerWrap = (function () {
            if (this.context.router.params.id) {
                return <div>
                    <FormItem>
                        <Button type="primary" onClick={() => { return this.context.router.push({ pathname: "/crowdFunding" }); }}>返回列表页</Button>
                    </FormItem></div>
            } else {
                return <div><FormItem>
                    <Button type="primary" onClick={this.hendleAddProject.bind(this)}>确认新增</Button>
                </FormItem></div>
            }
        }.bind(this))();
        return (
            <div className="cf_wrap">
                <h1>{this.props.parent.routeParams.id ? "众筹详情" : "新增众筹项目"}</h1>
                <Form onSubmit={this.handleSubmit} className="item_form">
                    <FormItem {...formItemLayout} label={`项目推广链接`}>
                        {getFieldDecorator('extentionUrl', { initialValue: this.state.extentionUrl || "" })(
                            <Input disabled={this.props.parent.routeParams.id ? true : false} placeholder="项目推广链接" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={`项目ID`}>
                        {getFieldDecorator('projectId', { initialValue: this.state.projectId })(
                            <Input disabled={this.props.parent.routeParams.id ? true : false} onBlur={(e) => { return this.projectIdBlur(e) }} placeholder="项目ID" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={`项目状态`}>
                        {getFieldDecorator('projectShowStatus', { initialValue: this.state.projectShowStatus })(
                            <RadioGroup disabled={this.props.parent.routeParams.id ? true : false}>
                                <Radio value='0'>上架</Radio>
                                <Radio value='1'>下架</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={`归属类型`}>
                        {getFieldDecorator('belongType', { initialValue: this.state.belongType })(
                            <Select style={{ width: '160px' }} disabled={this.props.parent.routeParams.id ? true : false}>
                                <Option value="SDK">插件</Option>
                                <Option value="CROWDFUNDING_LIFE">app众筹生活页配置</Option>
                                <Option value="CROWDFUNDING_HOME">app众筹首页配置</Option>
                            </Select>
                        )}
                    </FormItem>
                    <h1></h1>
                    <div className="item_imgWrap">
                        <label>项目图片：</label>
                        <img src={this.state.projectListImg} />
                    </div>
                    <div className="item_detilsWrap">
                        <FormItem {...formItemLayout2} label={`项目名称`}>
                            {getFieldDecorator('projectName', { initialValue: this.state.projectName })(
                                <Input disabled={true} placeholder="项目名称" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout2} label={`众筹开始时间`}>
                            {getFieldDecorator('beginTime', { initialValue: this.state.beginTime })(
                                <Input disabled={true} placeholder="众筹开始时间" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout2} label={`众筹结束时间`}>
                            {getFieldDecorator('endTime', { initialValue: this.state.endTime })(
                                <Input disabled={true} placeholder="众筹结束时间" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout2} label={`目标金额`}>
                            {getFieldDecorator('amount', { initialValue: this.state.amount })(
                                <Input disabled={true} placeholder="目标金额" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout2} label={`最低档位价格`}>
                            {getFieldDecorator('minStallAmount', { initialValue: this.state.minStallAmount })(
                                <Input disabled={true} placeholder="最低档位价格" />
                            )}
                        </FormItem>
                    </div>
                    <div className="item_bottomWrap">
                        <FormItem>
                            <Progress percent={this.state.progress == "-" ? 0 : this.state.progress} showInfo={false} />
                            <span className="childSpan">当前进度<strong>{this.state.progress}%</strong></span>
                            <span className="childSpan">已筹金额<strong>{this.state.collectedAmount}元</strong></span>
                            <span className="childSpan">众筹进展<strong>{this.state.remainTime}</strong></span>
                        </FormItem>
                        {footerWrap}
                    </div>
                </Form>
            </div>

        );
    }
}
class CrowdFundingItemWrap extends Component {
    constructor(props) {
        super(props);
    }
    static contextTypes = {
        mainProps: React.PropTypes.object.isRequired,
    }
    componentWillMount() {
        if (this.props.routeParams.id) {
            //编辑
            this.props.dispatch(getProject({ 'projectId': this.props.routeParams.id,'belongType': this.props.routeParams.belongType, merchantId: this.context.mainProps.merchantId }));
        }
    }

    render() {
        return (
            <div>
                <CrowdFundingItem parent={this.props} />
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    const projectItem = state.get('crowdFundItem').get("projectItem").projectItem;
    const record = state.get('crowdFundItem').get("projectItem").record;
    return {
        projectItem,
        record
    }
}
export default connect(mapStateToProps)(Form.create()(CrowdFundingItemWrap));