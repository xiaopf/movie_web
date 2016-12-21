
var User=require('../models/user');


exports.signup=function(req,res){

	var _user=req.body.user;

	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		};
		if(user){
			return res.redirect('/');
		}else{
			var user=new User(_user);
			user.save(function(err,user){
			if(err){
				console.log(err);
			}
			console.log(user);
			    var name=user.name;
			    var password=user.password;
			    req.session.user =user;
                res.redirect('/');
            });



		}
	})
}

exports.userlist=function(req,res){
	User.fetch(function(err,user){
		if(err){
			console.log(err);
		};

		res.render('userlist',{
			title:'用户列表',
			_user:user,
		})
	})
}


exports.signin=function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;

	User.findOne({name: name},function(err,user){
		if(err){
			console.log(err);
		};

		if(!user){
			return res.redirect('/');
		};

		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);
			};

			if(isMatch){
				req.session.user =user;

				return res.redirect('/');
			}else{
				console.log("password is not right")
			}
		})

	})

}

exports.signinReq=function(req,res,next){
	var user =req.session.user;
	if(!user){
		return res.redirect('/signin');
	};

	next();
}

exports.adminReq=function(req,res,next){
	var user=req.session.user;
	if(user.role<=0){
		return res.redirect('/');
	}else{
		next();

	}

	

}


exports.logout=function(req,res){
	delete req.session.user;
 
	res.redirect('/')
}

exports.showSignup=function(req,res){
	res.render('signup',{
	  title:'电影网注册页',
	})
}
exports.showSignin=function(req,res){
   res.render('signin',{
   	  title:'电影网登陆页',
   })
}
