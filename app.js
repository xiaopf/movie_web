// 服务器配置，路由配置
var express=require('express');     //引入express模块
var bodyParser = require('body-parser');
var path=require("path");
var logger = require('morgan');
var port=process.env.PORT||3000;    //设置端口
var app=express();                  //启动一个web服务器，实例化出一个app


var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoStore=require('connect-mongo')(session);
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var dbUrl='mongodb://localhost/mwdata';
mongoose.connect(dbUrl);

var models_path=__dirname+'/app/models';
var walk = function(path){
	fs
	  .readdirSync(path)
	  .forEach(function(file){
	  	var newPath=path+'/'+file;
	  	var stat=fs.statSync(newPath)

	  	if(stat.isFile()){
	  		if(/(.*)\.(js|coffee)/.test(file)){
	  			require(newPath)
	  		}
	  	}else if(stat.isDirectory()){
	  		walk(newPath)
	  	}
	  })
}




app.set('views','./app/views/pages');         //设置试图的根目录
app.set('view engine','jade');      //设置试图渲染引擎为jade
app.use(express.static(path.join(__dirname, '/public')));


app.locals.moment=require('moment');
app.use(cookieParser());
app.use(session({
	secret:'mwdata',
	store: new mongoStore({
		url:dbUrl,
	    collection:'sessions'
	})	
}));
// var multiparty=require('connect-multiparty');
// app.use(multiparty());
app.use(require('connect-multiparty')());

app.use(bodyParser.urlencoded({extended: true}));
app.listen(port);//监听端口

if('development'===app.get('env')){
	app.set('showStackError',true);
	app.use(logger(':method :url :status'));
	app.locals.pretty=true;
	mongoose.set('debug',true)
}

require('./config/routes')(app);

console.log('web is start!'+port);  // 为后台输出一个日志

