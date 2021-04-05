var information_marginLeft_to_navigation = 20;
var c_height;
var c_width;


var navigation = document.getElementById("navigation");
var information = document.getElementById("information");
var footer = document.getElementById("footer");
var footer_style = window.getComputedStyle(footer);
var information_style = window.getComputedStyle(information);
var header = document.getElementById("header");




var navigation_height = navigation.offsetHeight;
var footer_height = footer.offsetHeight;
var footer_marginTop = parseFloat(footer_style.marginTop);
var header_width = header.offsetWidth;
var information_marginLeft = parseFloat(information_style.marginLeft);
var information_paddingLeft = parseFloat(information_style.paddingLeft);
var information_paddingRight = parseFloat(information_style.paddingRight);
var footer_paddingLeft = parseFloat(footer_style.paddingLeft);
var footer_paddingRight = parseFloat(footer_style.paddingRight);
var information_marginTop = parseFloat(information_style.paddingTop);
var information_marginBottom = parseFloat(information_style.paddingBottom);
var navigation_width = navigation.offsetWidth;

information.style.width = header_width - information_marginLeft_to_navigation - navigation_width - information_paddingLeft - information_paddingRight;
footer.style.width = header_width - information_marginLeft_to_navigation - navigation_width - footer_paddingLeft - footer_paddingRight;

information.style.minHeight = navigation_height - footer_height - footer_marginTop - information_marginTop - information_marginBottom - 2;
information.style.marginLeft = navigation_width + information_marginLeft_to_navigation;
footer.style.marginLeft = navigation_width + information_marginLeft_to_navigation;



var author_name = document.getElementsByTagName("meta")[0];
document.getElementById("author").innerHTML = "Autor: " + author_name.content;

window.addEventListener('resize', refresh);

function refresh() {
  navigation_height = navigation.offsetHeight;
  information.style.minHeight = navigation_height - footer_height - footer_marginTop - information_marginTop - information_marginBottom - 2;
}
