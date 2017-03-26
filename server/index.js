var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var webpack = require('webpack');
// var webpackMiddleware from 'webpack-dev-middleware';
// var webpackHotMiddleware from 'webpack-hot-middleware';
// var webpackConfig from '../webpack.config.dev';


var app = express();

app.use(bodyParser.json());
var login = require('./routes/login');
var register = require('./routes/register');
var systemMessagesOperate = require('./routes/systemMessagesOperate');
var bidMessagesOperate = require('./routes/bidMessagesOperate');
var itemsMessagesOperate = require('./routes/itemsMessagesOperate');
var getItemDetial = require('./routes/getItemDetail');
var getQuestions = require('./routes/getQuestions');
var addComment = require('./routes/addComment');
var addAnswer = require('./routes/addAnswer');
var review = require('./routes/reviews');
var departments = require('./routes/departments');

app.use('/api/getDepartments', departments);
app.use('/api/signIn', login);
app.use('/api/registerAccount', register);
app.use('/api/inbox/systemMessages/operate',systemMessagesOperate);
app.use('/api/inbox/bidMessages/operate',bidMessagesOperate);
app.use('/api/inbox/itemsMessages/operate',itemsMessagesOperate);
app.use('/api/itemDetail', getItemDetial);
app.use('/api/question', getQuestions);
app.use('/api/comment', addComment);
app.use('/api/answer', addAnswer);
app.use('/api/review', review);

// const compiler = webpack(webpackConfig);

// app.use(webpackMiddleware(compiler, {
//   hot: true,
//   publicPath: webpackConfig.output.publicPath,
//   noInfo: true
// }));
// app.use(webpackHotMiddleware(compiler));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });

app.listen(3000, () => console.log('Running on localhost:3000'));