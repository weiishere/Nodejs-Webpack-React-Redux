import { Immutable, Map, fromJS } from 'immutable';

function app_1_details(state = Map({
    'data': { palyer: {}}
}), action) {
    switch (action.type) {
        case 'GETONE':
            return state.set('data', { palyer: action.payload });
        default:
            return state;
    }
}
export default app_1_details;