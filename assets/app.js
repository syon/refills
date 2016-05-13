$(function() {

  $('#article p > img').each(function(){
    $(this).parent().addClass('imgbox');
  });

  $('#gMenu .menu-link[href="'+location.pathname+'"]').closest('li').addClass('selected');

});
