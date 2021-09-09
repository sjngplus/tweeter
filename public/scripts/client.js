/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { charCountFunc } = require('./composer-char-counter');


// const tweetsDataBase = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1630901014194
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1630987414194
//   }
// ]

const renderTweets = function(tweetsArr) {
  $('.tweets-list').empty();
  for (const tweet of tweetsArr) {
    const $tweet = createTweetElement(tweet)    
    $('.tweets-list').prepend($tweet);
  }
};

const escapeXSS = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function(tweet) {  
  return (`
    <article>
      <header>
        <span><img src="${tweet.user.avatars}"></span>
        <span class="profile-name">${tweet.user.name}</span>
        <span>${tweet.user.handle}</span>
      </header>

      <p>${escapeXSS(tweet.content.text)}</p>

      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </footer>
    </article>
  `);  
}

const loadTweets = function() {
  $.get( "/tweets/", function(data) {
    renderTweets(data);      
  });
};


$(document).ready(function() {
  
  
  // renderTweets(tweetsDataBase);
  
  loadTweets();
  
  $("section.tweets-list").on("mouseover", function(event) {
    const target = $(event.target).closest("article");
    target.css({'box-shadow': '5px 5px 10px'})
  });

  $("section.tweets-list").on("mouseout", function(event) {
    const target = $(event.target).closest("article");
    target.css({'box-shadow': 'none'})
  });
  
  $("section.tweets-list").on("mouseover", function(event) {
    const target = event.target.localName;
    if (target === "i") {
      $(event.target).css({'color': 'darkgoldenrod'});
    }
  }),

  $("section.tweets-list").on("mouseout", function(event) { 
    const target = event.target.localName;
    if (target === "i") {
      $(event.target).css({'color': 'inherit'});  
    }
  });  
  
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    $('#empty-text').css({'display': 'none', 'visibility': 'hidden'});
    $('#text-over-limit').css({'display': 'none', 'visibility': 'hidden'});
    const formTextArea = $(this).find('textarea');
    const textLength = $(formTextArea).val().length;
    const trimmedText = $(formTextArea).val().trim();    
    if (!trimmedText) {
      return $('#empty-text').css({'display': 'block','visibility': 'visible', 'height': '1.5em'});
    }    
    if (textLength > 140) {
      return $('#text-over-limit').css({'display': 'block', 'visibility': 'visible', 'height': '1.5em'});
    }
    const urlEncodedText = formTextArea.serialize();
    $.post("/tweets", urlEncodedText, function() {
      loadTweets();
      $(formTextArea).val("");
      $(".counter").text("140");
    });    
  });

});



// if ($inputField === "") {
//   return $(".error-msgs").text("Post cannot be empty!").slideDown().show();
// }

// if ($counter.val() < 0) {
//   return $(".error-msgs").text("Post cannot exceed over 140 character limit!").slideDown().show();
// }