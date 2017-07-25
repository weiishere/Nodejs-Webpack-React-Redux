import { Immutable, Map, fromJS } from 'immutable';

function crowdFundItem(state = Map({
  'projectItem': { projectItem: null, record: null }
}), action) {
  switch (action.type) {
    case 'Getproject':
      return state.set('projectItem', action.payload);
    case 'initAddProject':
      return state.set('projectItem', {});
    case 'getSingleProject':
      return state.set('projectItem', action.payload);
    case 'getSingleProject':
      return state.set('projectItem', action.payload);
    default:
      return state;
  }
}
export default crowdFundItem;