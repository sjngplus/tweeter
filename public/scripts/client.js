$(document).ready(function() {  
    
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
  
  $('.new-tweet form').submit(newTweetPost);

});


//##HELPER FUNCTIONS BELOW##\\


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

const newTweetPost = function(event) {
  event.preventDefault();
  $('#empty-text').slideUp();
  $('#text-over-limit').slideUp();
  const formTextArea = $(this).find('textarea');
  const textLength = $(formTextArea).val().length;
  const trimmedText = $(formTextArea).val().trim();    
  if (!trimmedText) {
    return $('#empty-text').slideDown();
  }    
  if (textLength > 140) {
    return $('#text-over-limit').slideDown();
  }
  const urlEncodedText = formTextArea.serialize();
  $.post("/tweets", urlEncodedText, function() {
    loadTweets();
    $(formTextArea).val("");
    $(".counter").text("140");
  });    
}