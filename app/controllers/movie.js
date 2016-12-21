var Movie=require('../models/movie');
var Category=require('../models/category');
var Comment=require('../models/comment');
var _=require('underscore');
var fs=require('fs');
var path=require('path');

exports.detail=function(req,res){
	var id=req.params.id;

	Movie.update({_id:id},{$inc:{pv:1}},function(err){
	    	console.log(err)
	    })

	Movie.findById(id,function(err,movie){
		Comment.find({movie:id})
               .populate('from','name')
               .populate('reply.from reply.to','name')
		       .exec(function(err,comments){
		       	
				var items=[];
		        for(var i=0;i<comments.length;i++){
		        	items[i]=comments[comments.length-i-1];
		        	console.log(items[i]);
		        }
        

				res.render('detail',{
					title:'电影网详情页',
					movie:movie,
					comments:items,
			    })
	    })
    })
}


exports.movie=function(req,res){
	Category.find({},function(err,categories){
		res.render('admin',{
			title:'电影网录入页',
			categories:categories,
			movie:{}	
	    })	
	})
}


exports.update=function(req,res){
	var id=req.params.id;

	if(id){
		Movie.findById(id,function(err,movie){
			Category.find({},function(err,categories){
				res.render('admin',{
				title:'电影网后台更新页',
				movie:movie,
				categories:categories
			    })
			})
		})
	}
}

exports.savePoster=function(req,res,next){
	var posterData=req.files.uploadPoster;


	var filePath=posterData.path;
	var originalFilename=posterData.originalFilename;

	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp=Date.now();
			var type=posterData.type.split('/')[1];
			var poster=timestamp+'.'+type;
			var newPath=path.join(__dirname,'../../','/public/upload/'+poster);

			fs.writeFile(newPath,data,function(err){
				req.poster=poster;
				next();
			})
		})
	}else{
		next()
	}
}

exports.new=function(req,res){

	var id=req.body.movie._id;
	var movieObj=req.body.movie;
	var _movie;
    
    if(req.poster){
    	movieObj.poster=req.poster
    }

	if(id){

		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}

			_movie=_.extend(movie,movieObj);

			_movie.save(function(err,movie){

				if(err){
					console.log(err)
				}

				res.redirect('/movie/'+movie._id);

			})
		})


	}else{

		_movie=new Movie(movieObj);
		
		var categoryId=_movie.category;
		var categoryName=movieObj.categoryName;

        
		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			};
         
	        if(categoryId){
				Category.findById(categoryId,function(err,category){
					category.movies.push(movie._id);

					category.save(function(err,category){
						res.redirect('/movie/'+movie._id)	
					})
				});
			}
			else if(categoryName){
				var category=new Category({
					name:categoryName,
					movies:[movie._id]
				});

				console.log(categoryName)

				category.save(function(err,category){
					movie.category=category._id;
					movie.save(function(err,movie){
						res.redirect('/movie/'+movie._id)
					})
				})
			} 
		})
	}
}






exports.movielist=function(req,res){
	Movie.fetch(function(err,movie){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'电影网列表',        
			movie:movie,
		})
	})
}

// http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf


exports.list_del=function(req,res){

	var id=req.query.id;

	if(id){

		Movie.remove({_id:id},function(err,movie){
		  if(err){
		  	console.log(err)
		  }else{
		  	res.json({success:1})
		  }
		})

	}
}
