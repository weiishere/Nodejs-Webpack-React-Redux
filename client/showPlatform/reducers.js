import {combineReducers} from 'redux-immutable';
import routing from '../common/reducers/routing';
import toast from '../common/reducers/toast';
import caches from '../common/reducers/caches';
import app_1 from './app-1/reducer';
import app_1_details from './app-1/detailPanel/reducer';

export default combineReducers({
  routing,
  toast,
  caches,
  app_1,
  app_1_details
});
