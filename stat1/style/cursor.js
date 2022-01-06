var t = 0;
function alt_cursor(){
  t--;
  if(t<0){
    document.body.style.cursor = "none";
  }
}
document.onmousemove = function(){
  t = 5;
  document.body.style.cursor = "url(figs/cursor.png),pointer";
}
setInterval(alt_cursor, 100);
