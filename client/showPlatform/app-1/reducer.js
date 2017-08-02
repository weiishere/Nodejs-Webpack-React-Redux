import { Immutable, Map, fromJS } from 'immutable';

function app_1(state = Map({
    'init': {}
}), action) {
    switch (action.type) {
        case 'test':
            return state;
        default:
            return state;
    }
}
export default app_1;