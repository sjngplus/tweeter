/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("section.tweets-list article").hover(function() {
    $(this).css({'box-shadow': '5px 5px 10px'})
  }, function() {
    $(this).css({'box-shadow': 'none'})
  })
  
  // $("section.tweets-list article footer i").mouseenter(function() {
  //   const currentIcon = $(this);
  //   currentIcon.css({'color': 'darkgoldenrod'});
  // })
  // .mouseleave(function(){
  //   const currentIcon = $(this);
  //   currentIcon.css({'color': 'inherit'});  
  // })
  
  $("section.tweets-list article footer i").hover(function() {
    const currentIcon = $(this);
    currentIcon.css({'color': 'darkgoldenrod'});
  }, function() {
    const currentIcon = $(this);
    currentIcon.css({'color': 'inherit'});  
  })
  
  
  

});


