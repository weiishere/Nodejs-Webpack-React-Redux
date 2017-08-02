// 引入模块
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const webpack = require('webpack');
const logger = require('./helper/mylogger').Logger;
const compress = require('compression');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const getClientIP = require('./helper/utils').getClientIP;
const apiRouter = require('./routes/api-route-loader');
const pageRouter = require('./routes/routes');


logger.info(`process.env.NODE_ENV is [${process.env.NODE_ENV}]`);
const isDev = process.env.NODE_ENV === 'development';
const isProduct = process.env.NODE_ENV === 'product';
var app = express();

//页面上下文，根路径，nginx 会卸载掉前缀 context
const context = isProduct ? '/' : '/online/';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//非生产环境开启Gzip，生产环境nginx会开启gzip
if (!isProduct) {
  app.use(compress());
}
app.use(bodyParser.json({ limit: '20mb' }));//设置前端post提交最大内容
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());//解释Cookie的工具，通过req.cookies可以取到传过来的cookie，并把它们转成对象
app.use(require('./helper/requestLogger').create(logger));

//--------------------------------------------------------------------------
// 静态文件配置
app.use(express.static(path.join(__dirname, '../public')));
// app.get('/', function (req, res, next) {
//     var c_path = req.params.module;
//     var Action = require("./server/action/data/" + c_path);
//     Action.execute(req, res);
// })
// 对所有(/)URL或路由返回index.html 
// app.get('/', function (req, res) {
//     res.render('index');
// });
//--------------------------------------------------------------------------

if (isDev) {
  const webpackConfig = require('../webpack.config.dev.babel');
  const compiler = webpack(webpackConfig);
  //热部署，自动刷新，需要结合 webpack.config.dev.babel 中的定义
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, //如果设置该参数为 true，则不打印输出信息
    cache: true, //开启缓存，增量编译
    stats: {
      colors: true, //打印日志显示颜色
      reasons: true //打印相关被引入的模块
    },
    publicPath: webpackConfig.output.publicPath
  }));


  app.use(require('webpack-hot-middleware')(compiler, {
    log: logger.info,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

//get client IP
app.use((req, res, next) => {
  req.headers.clientIP = getClientIP(req);
  next();
});
// load routers
apiRouter(app);
pageRouter(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  //不处理 map 和 json 格式的数据
  if (/\.(map|json)$/.test(req.url)) {
    return next();
  }
  const err = new Error(`${req.url},Not Found`);
  err.status = 404;
  next(err);
});

// error handlers
// will print stacktrace
app.use((err, req, res, next) => {
  if (req.url.startsWith('/api')) {
    const msg = errorHandler(err);
    return res.status(200).json({
      code: err.code || 'E-50x',
      msg
    });
  }

  logger.error(err.stack);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;