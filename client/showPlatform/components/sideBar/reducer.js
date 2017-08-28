import { Immutable, Map, fromJS } from 'immutable';

function sideBar(state = Map({
    'data': { key:'intro' }
}), action) {
    switch (action.type) {
        case 'SELECT':
            return state.set('data', { key: action.payload });
        default:
            return state;
    }
}
export default sideBar;