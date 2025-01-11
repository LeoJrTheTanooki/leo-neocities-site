let iframe = document.getElementsByTagName("iframe");
let tabs = document.getElementById("tabs");

switch (window.location.pathname) {
  case "/":
    window.history.pushState("object or string", "Title", "/home");
    iframe[0].src = "/pages/home.html";
    break;
  case "/home":
    window.history.pushState("object or string", "Title", "/home");
    iframe[0].src = "/pages/home.html";
    break;
  case "/graphicbazaar":
    window.history.pushState("object or string", "Title", "/graphicbazaar");
    iframe[0].src = "/pages/graphicbazaar.html";
    break;
  case "/roster":
    window.history.pushState("object or string", "Title", "/roster");
    iframe[0].src = "/pages/roster.html";
    break;
  case "/healthtest":
    window.history.pushState("object or string", "Title", "/healthtest");
    iframe[0].src = "/pages/healthtest.html";
    break;
  default:
    iframe[0].src = "/pages/not_found.html";
    break;
}

for (let i = 0; i < tabs.children.length; i++) {
  tabs.children[i].addEventListener("click", (e) => {
    iframe[0].src = e.target.value;
    window.history.pushState("object or string", "Title", e.target.id);
  });
}
