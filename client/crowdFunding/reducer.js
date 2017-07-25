import {combineReducers} from 'redux-immutable';
import routing from '../../common/reducers/routing';
import toast from '../../common/reducers/toast';
import caches from '../../common/reducers/caches';
import crowdFundingList from './crowdFundingList/reducer';
import crowdFundItem from './crowdFundingItem/reducer';
import {fetchStatus} from './utils/fetchReducer';

export default combineReducers({
  routing,
  toast,
  caches,
  fetchStatus,
  crowdFundingList,
  crowdFundItem
});
