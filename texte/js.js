var navigation = document.getElementById("navigation");
var information = document.getElementById("information");
var footer = document.getElementById("footer");

var navigation_height = navigation.offsetHeight;
var footer_height = footer.offsetHeight;
var footer_style = window.getComputedStyle(footer);
var footer_marginTop = parseFloat(footer_style.marginTop);
var information_style = window.getComputedStyle(information);

console.log(navigation_height - footer_height - parseFloat(footer_style.marginTop));

information.style.minHeight = navigation_height - footer_height - footer_marginTop - 42; // - parseFloat(information_style.padding) - parseFloat(information_style.padding);

var author_name = document.getElementsByTagName("meta")[0];
var author_text = document.getElementById("author").innerHTML = "Autor: " + author_name.content;
