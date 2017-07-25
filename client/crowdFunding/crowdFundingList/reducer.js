import { Immutable, Map, fromJS } from 'immutable';

function crowdFundingList(state = Map({
  'projectList': { projectInfoList: [], totalCount: 0, pageSize: 2, pageNum: 1 }
}), action) {
  switch (action.type) {
    case 'GetProjectList':
      return state.set('projectList', action.projectList);
    case 'deleteProject':
      return state;//.set('deleteProject', action.payload);
    case 'offlineProject':
      return state;//.set('offlineProject', action.payload);
    default:
      return state;
  }
}
export default crowdFundingList;