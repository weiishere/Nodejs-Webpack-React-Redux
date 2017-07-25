import {Map} from 'immutable';
import {fetchActions} from '../../../../common/action/fetchAction';
export const fetchStatus=(state=Map({fetch:'end',message:'',count:0}),action)=>{
  let count=state.get('count');
  switch (action.type){
    case fetchActions.START_REQUEST:
      return state.set('fetch','start').set('count',count+action.count).set('message',action.msg);
    case fetchActions.REQUEST_SUCCESS:
      return state.set('fetch','end').set('message',action.msg).set('count',count+action.count);
    case fetchActions.REQUEST_FAIL:
      return state.set('fetch','end').set('message',action.msg).set('count',count+action.count);
    default:
      return state;
  }
}