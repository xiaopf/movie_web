var Category=require('../models/category');
var Comment=require('../models/comment');
var _=require('underscore');


exports.add=function(req,res){
    res.render('category_admin',{
        title:'电影网 后台分类录入页',
        category:{}
    })
}


exports.save=function(req,res){

    var _category=req.body.category;

    var category=new Category(_category);

    category.save(function(err,category){
        if(err){
            console.log(err)
        }

        res.redirect('/admin/category/list')
    })
}

exports.list=function(req,res){
    Category.fetch(function(err,categories){
        if(err){
            console.log(err)
        }
        res.render('categorylist',{
            title:'电影网分类列表页',        
            categories:categories,
        })
    })
}



