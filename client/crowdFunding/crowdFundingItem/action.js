import fetch from '../utils/fetch'

/**
 * 获取项目详情
 * @param merchantId
 * @returns {Function}
 */
const getProject = (data, callback) => {
    return function (dispatch, getState) {
        fetch(dispatch, {
            url: '/fas-sys/api/crowdFund/crowdFunding/get',
            type: 'post',
            data: data,
            success: function (json) {
                fetch(dispatch, {
                    url: '/fas-sys/api/crowdFund/crowdFunding/getRecord',
                    type: 'post',
                    data: data,
                    success: function (json2) {
                        console.log(json2.data);
                        dispatch({
                            type: "Getproject",
                            payload: { projectItem: json.data, record: json2.data }
                        });
                        if (callback) callback();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}
const getSingleProject = (data, callback) => {
    return function (dispatch, getState) {
        fetch(dispatch, {
            url: '/fas-sys/api/crowdFund/crowdFunding/get',
            type: 'post',
            data: data,
            success: function (json) {
                json.data['projectId']=data.projectId;
                dispatch({
                    type: "getSingleProject",
                    payload: { projectItem: json.data, record: null }
                });
                if (callback) callback(json);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}
const initAddProject = () => {
    return {
        type: "initAddProject"
    }
}
const addProject=(data,callback)=>{
    return function (dispatch, getState) {
        fetch(dispatch, {
            url: '/fas-sys/api/crowdFund/crowdFunding/addProject',
            type: 'post',
            data: data,
            success: function (json) {
                dispatch({
                    type: "addProject",
                    payload: json.data
                });
                if(callback)callback(json);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}



export { getProject, initAddProject, getSingleProject,addProject }