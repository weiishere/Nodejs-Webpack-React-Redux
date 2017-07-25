import { Map } from 'immutable';

//处理缓存数据
export default function caches(state = Map({ "menukey": "/crowdFunding" }), action) {
  switch (action.type) {
    case 'set_cache':
      return state.set(action.key, action.value);
    case 'remove_cache': {
      const { keys = [] } = action;
      let _state = state;
      keys.forEach((item) => {
        _state = _state.remove(item);
      });
      return _state;
    }
    case 'clear_cache':
      return state.clear();
    case 'set_menu':

      return state.set('menukey', action.payload);
    default:
      return state;
  }
}
