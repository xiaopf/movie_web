$(function(){
    $('.comment').click(function(e){
	    var target=$(this);
	    var toId=target.data('tid');
	    var commentId=target.data('cid');
	    var toName=target.data('tname');

	    $('#textarea').val('回复'+toName+':').focus(function(){
	    	$('#textarea').val('')
	    })


	    if($('#toId').length>0){
            
            $('#toId').attr({
				value:toId,
            });

            $('#commentId').attr({
				value:commentId,
            })

	    }else{

		    $('<input>').attr({
		    	type:'hidden',
		    	name:'comment[tid]',
		    	id:'toId',
		    	value:toId,
		    }).prependTo('#commentForm');

		    $('<input>').attr({
		    	type:'hidden',
		    	name:'comment[cid]',
		    	id:'commentId',
		    	value:commentId,
		    }).prependTo('#commentForm');

		}





















    	// var content = $('#content').val();

    	// $('<div>').prependTo($('#comment')).addClass('media').text(content);


	    // $.ajax({
	    // 	type:'POST',
	    // 	url:'/movie/comment'
	    // })
	    // .done(function(result){
	    	
	    // })
		





	})

})