let iframe = document.getElementsByTagName("iframe");
let tabs = document.getElementById("tabs");

for (let i = 0; i < tabs.children.length; i++) {
  tabs.children[i].addEventListener("click", (e) => {
    iframe[0].src = e.target.value;
  });
}
