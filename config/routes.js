var Index=require('../app/controllers/index');
var Movie=require('../app/controllers/movie');
var User=require('../app/controllers/user');
var Comment=require('../app/controllers/comment');
var Category=require('../app/controllers/category');

module.exports=function(app){

	app.use(function(req,res,next){
		var _user=req.session.user;
		app.locals.user=_user;
		next();
	})

	app.get('/',Index.index);


	app.get('/movie/:id',Movie.detail);

	app.get('/admin/movie/add',User.signinReq,User.adminReq,Movie.movie);

	app.get('/admin/movie/update/:id',User.signinReq,User.adminReq,Movie.update);

	app.post('/admin/movie/new',User.signinReq,User.adminReq,Movie.savePoster,Movie.new);

	app.get('/admin/movie/list',User.signinReq,User.adminReq,Movie.movielist);
	app.delete('/admin/movie/list',Movie.list_del);



	app.get('/signup',User.showSignup);
	app.get('/signin',User.showSignin);

	app.post('/user/signup',User.signup);
	app.post('/user/signin',User.signin);

	app.get('/logout',User.logout);

	app.get('/admin/user/list',User.signinReq,User.adminReq,User.userlist);//查看，修改删除都是不能点
	
	app.post('/movie/comment',User.signinReq,Comment.save);


// 删除和更新都没有添加
	app.get('/admin/category/add',User.signinReq,User.adminReq,Category.add);
	app.post('/admin/category/new',User.signinReq,User.adminReq,Category.save);
	app.get('/admin/category/list',User.signinReq,User.adminReq,Category.list);

    app.get('/result',Index.search)
}


// http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf  http://upload.cheaa.com/2015/0115/1421290012669.jpg