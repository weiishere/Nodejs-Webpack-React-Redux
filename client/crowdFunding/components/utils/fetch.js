import _fetch from '../../../utils/fetch';
import { startRequest, requestFail, requestSuccess } from '../../../common/action/fetchAction';
const fetch = (dispatch, options = {
  type: '',
  url: '',
  data: {}
}) => {
  dispatch(startRequest());
  const defaultOptions = {
    type: 'get',
    success: function (data) {

    },
    error: function (msg) {

    }
  }
  options = Object.assign(defaultOptions, options);
  let config = { url: options.url, method: options.type }
  if (options.type.toLowerCase() === 'get' && options.data) {
    let url = options.url;
    let start = '';
    if (url.indexOf('?') !== -1) {
      if (url.lastIndexOf('&') !== (url.length - 1)) {
        start = '&';
      }
    } else {
      start = '?';
    }
    url += start;
    for (let i in options.data) {
      url += i + '=' + encodeURIComponent(options.data[i]) + "&"
    }
    if (url.lastIndexOf('&') === (url.length - 1)) {
      url = url.substring(0, url.length - 1);
    }
    config.url = url;
  } else {
    config.body = options.data;
  }
  return _fetch(config).then(function (data) {
    dispatch(requestSuccess(data.msg || '成功'));
    options.success(data);
    return Promise.resolve(data);
  }, function (msg) {
    dispatch(requestFail(msg));
    options.error(msg);
    return Promise.reject(msg);
  })
}
export default fetch;
