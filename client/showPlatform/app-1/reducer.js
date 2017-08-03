import { Immutable, Map, fromJS } from 'immutable';

function app_1(state = Map({
    'data': { palyerList: [], totalCount: 0, pageSize: 2, pageNum: 1 }
}), action) {
    switch (action.type) {
        case 'GETLIST':
            return state.set('data', { palyerList: action.payload });
        case 'ADDPLAYER':
            return state.set('data', { palyerList: action.payload });
        default:
            return state;
    }
}
export default app_1;