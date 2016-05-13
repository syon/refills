$(function() {

  $('#article p > img').each(function(){
    $(this).parent().addClass('imgbox');
  });

  $('#gMenu .menu-link[href="'+location.pathname+'"]').closest('li').addClass('selected');

  var queue = null, wait = 300;
  doResizeProcess();

  window.addEventListener('resize', function() {
    clearTimeout( queue );
    queue = setTimeout(function() {
      doResizeProcess();
    }, wait);
  }, false);

  function doResizeProcess() {
    $('#gSide').height($(window).height());
  }

});
