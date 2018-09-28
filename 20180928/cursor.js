var t = 0;
function alt_cursor(){
  t--;
  if(t<0){
    document.body.style.cursor = "none";
  }
}
document.onmousemove = function(){
  t = 3;
  document.body.style.cursor = "url(img/cursor.png),pointer";
}
setInterval(alt_cursor, 1000);