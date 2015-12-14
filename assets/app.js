function loadRefill(rid) {
  $.ajax({
    url: "/refills/refills/" + rid + "/",
    cache: false
  })
    .done(function( html ) {
      var a = $(html).find('#article');
      $("#results").hide().html( a.html() ).fadeIn();
    });

  $('.menu-item').removeClass('selected');
  $('[data-rid='+rid+']').addClass('selected');
}
