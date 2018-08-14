(function($) {

    "use strict";
	
	// Responsive Menu

	// $('#themeix-menu').slicknav();
	  
	// Wow Animation 
	
	var wow = new WOW();
	wow.init();
	
	// Banner Slider 
	$('.banner-carousel').owlCarousel({
        animateIn: 'fadeIn',
		autoplay: true,
		autoplaySpeed: 5000,
		mouseDrag: false,
		loop: true,
		nav: true,
		dots: true,
		navText: ["<i class='fa fa-angle-double-left'></i>","<i class='fa fa-angle-double-right'></i>"],
		responsive:{
			0:{
				items: 1,
			},
			1000:{
				items: 1
			}
		}
	});
	 
	 // Instafeed 
	  if($("#instagram").length > 0) {

     var feed = new Instafeed({
      get: 'user',
       userId: 8393530200,
       limit: 6,
       accessToken: '8393530200.1677ed0.5dd0570828f54283af26c50b64fdfc34',
       target: 'instagram',
       resolution: 'standard_resolution',
     });

      feed.run();
    }




		
		// highlight code
	  if($("pre code").length >0){

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);

    });
  }



	  $(".comment-toggler").on("click", function(e){
            
           e.preventDefault();
          
          $(".comments-container").toggleClass("hide");


          if($(".comments-container").hasClass("hide")){

            $(".comment-toggler").text("Show Comments");

          }else {

            $(".comment-toggler").text("Hide Comments");
          }
	  });


	  
   // Load More Posts




  var page_number = 3;

  var pagination = 4;

  

   $(".load-more").on("click", function(e){

   	     


   	     e.preventDefault();

         var url = ghost.url.api("posts")+'&include=tags&author&limit='+pagination+'&page='+page_number+'';

         
         $.ajax({
              
              url: url,
              type: 'get'
           
         }).done(function(data){

         var current_page = (data.meta.pagination.page * data.meta.pagination.limit);


         var total_page   = (data.meta.pagination.total - 1);

           if(current_page >= total_page) {

              $(".load-more").addClass('disabled');
           }

          $(data.posts).each(function( i, post ){

                    var post_title = post.title;
                    var post_image = post.feature_image;
                    var post_link  = post.url;
                   
                    var tag_name = "";
                    var tag_slug = "";
                    var published_date = Date.parse(post.published_at);

                    var a = new Date(published_date);
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year;
  
                      
                   if( post.tags.length > 0 ){

                      tag_name = post.tags[0].name;
                      tag_slug = post.tags[0].slug;

                   } 
 

           $(".post-wrapper").append('<div class="col-lg-6"><div class="themeix-post-wrapper wow fadeIn" data-wow-duration="1s"><div class="post-thumb"><a href="'+post_link+'"><img alt="'+post_title+'" src="'+post_image+'"></a></div><div class="post-details"><ul class="post-meta list-inline"><li class="list-inline-item tag-link"><a href="/tag/'+tag_slug+'/">'+tag_name+'</a></li><li class="list-inline-item">'+time+'</li></ul><a href="'+post_link+'"><h4>'+post_title+'</h4></a><ul class="post-social-link list-inline"><li class="list-inline-item"><a href="https://facebook.com/"><i class="fa fa-facebook"></i></a></li><li class="list-inline-item"><a href="https://twitter.com"><i class="fa fa-twitter"></i></a></li><li class="list-inline-item"><a href="https://pinterest.com/"><i class="fa fa-pinterest"></i></a></li><li class="list-inline-item"><a href="http://linkedin.com/"><i class="fa fa-linkedin"></i></a></li><li class="list-inline-item"><a href="https://plus-google.com/"><i class="fa fa-google-plus"></i></a></li></ul></div></div></div>');

                  
                   
             });

            page_number += 1;
                 
         });
   });


   // FitVids

   $(".container").fitVids();


  // ghosthunter search

  $(".search-field").ghostHunter({
    results: ".search-result",
    onKeyUp: true,
    zeroResultsInfo: false,
    info_template: "<p>Number of posts found: {{amount}}</p>",
    result_template: "<div class='search-info'><h5 class='search-title'><a href='{{link}}'>{{title}}</a></h5></div>"
});



















   // var nextPage = 2;
    
   //  var pagination = 2;

    
   //  $('#load-posts').click(function(e) {

   //    e.preventDefault();
   //      $.ajax({
   //          url: ghost.url.api("posts") + '&include=tags&limit=' + pagination + '&page=' + nextPage,
   //          type: 'get'

   //      }).done(function(data) {
          
   //          $.each(data.posts, function(i, post) {

   //            console.log(post);
                
   //              $.ajax({
   //                  url: ghost.url.api("users") + '&filter=id:' + post.author,
   //                  type: 'get'
   //              }).done(function(data) {
   //                  $.each(data.users, function(i, users) {
   //                      insertPost(post, users);
   //                  });
   //              });
   //          });

   //      }).done(function(data) {

   //          if (nextPage == data.meta.pagination.total) {
   //              $('#load-posts').hide();
   //          }

   //      }).fail(function(err) {

   //          console.log(err);
   //      });
   //  })

   //  function insertPost(postData, authorData) {

   //    var postDay = postData.published_at;

   //    console.log(postDay)
        
   //    var postInfo = '<div class="xenon-post"><div class="xenon-post-date text-center"><div class="post-date-card"><span>'+postData.published_at+'<br><span class="date-spelling">Nov</span></span></div></div><div class="xenon-post-content"> <a class="post-img" href="/post-for-testing/"><img src="'+postData.feature_image+'" alt="'+postData.title+'"> </a> <div class="post-content-wrap"> <ul class="list-inline"> <li class="list-inline-item"> <a href="/author/themeix/">'+authorData.name+'<i class="fa fa-user" aria-hidden="true"></i></a> </li><li class="list-inline-item"> </li></ul> <h2><a href="/post-for-testing/">'+postData.title+'</a></h2> <p> '+postData.excerpt+'</p><a href="'+postData.url+'" class="card-read-more">read more</a> </div></div></div>' ;

        
   //      $('.blog_container').append(postInfo);
       
   //          nextPage += 1;
   //     }


})(jQuery);