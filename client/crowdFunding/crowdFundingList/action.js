import fetch from '../utils/fetch'

/**
 * 获取项目列表
 * @param merchantId
 * @returns {Function}
 */
const getProjectList = (data)=>{
  return function (dispatch, getState) {
      fetch(dispatch, {
        url: '/fas-sys/api/crowdFund/crowdFunding/list',
        type:'post',
        data:data,
        success: function (json) {
              dispatch({
                        type: 'GetProjectList',
                        projectList: json.data
                    }); 
          },
        error: function (error) {
              console.log(error);
          }
      });
  }
}
const deleteProject=(data,callback)=>{
    return function (dispatch, getState) {
        fetch(dispatch, {
            url: '/fas-sys/api/crowdFund/crowdFunding/deleteProject',
            type: 'post',
            data: data,
            success: function (json) {
                dispatch({
                    type: "deleteProject",
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
const offlineProject=(data,callback)=>{
    return function (dispatch, getState) {
        fetch(dispatch, {
            url: '/fas-sys/api/crowdFund/crowdFunding/offlineProject',
            type: 'post',
            data: data,
            success: function (json) {
                dispatch({
                    type: "offlineProject",
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


export {getProjectList,deleteProject,offlineProject}