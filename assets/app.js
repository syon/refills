$(function() {

  $('#article p > img').each(function(){
    $(this).parent().addClass('imgbox');
  });

  $('#gMenu .menu-link[href="'+location.pathname+'"]').closest('li').addClass('selected');

  resizeProcess();

  menuInitialScroll();

});

function menuInitialScroll() {
  var offset = $('.selected').closest('.binder').offset().top - 130;
  $('#gSide').scrollTop(offset);
}

function resizeProcess() {
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
    $('#gSide > #gMenu').css('paddingBottom', $(window).height());
  }
}
