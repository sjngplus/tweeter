$(document).ready(function() {
  
  charCountFunc();

});


const charCountFunc = function() {
  $("#tweet-text").on("input", function() {
    $('#empty-text').slideUp();
    $('#text-over-limit').slideUp();
    let charCount = 140 - $(this).val().length;
    const counterHtmlTag = $(this).closest("form", "section#new-tweet").find("output");
    counterHtmlTag.text(charCount);
    if (charCount < 0) {
      counterHtmlTag.css({"color": "red"});
    } else {
      counterHtmlTag.css({"color": "inherit"});
    }
  });
}