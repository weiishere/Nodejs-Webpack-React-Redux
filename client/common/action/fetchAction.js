const START_REQUEST='start_request';
const REQUEST_FAIL='request_fail';
const REQUEST_SUCCESS='request_success';
const CLEAR_MSG='clear_msg';

export const fetchActions={
  START_REQUEST,
  REQUEST_FAIL,
  REQUEST_SUCCESS,
  CLEAR_MSG
}
export const startRequest=()=>{
  return {
    type:START_REQUEST,
    count:1,
    msg:''
  }
}
export const requestFail=(msg,code)=>{
  return {
    type:REQUEST_FAIL,
    msg:msg,
    count:-1,
    code:code
  }
}
export const requestSuccess=(msg,code)=>{
  return {
    type:REQUEST_SUCCESS,
    msg:msg,
    count:-1,
    code:code
  }
}

export const clearMsg=()=>{
  return {
    type:CLEAR_MSG,
    msg:"",
    count:0
  }
}

