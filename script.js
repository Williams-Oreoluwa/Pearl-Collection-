let search = document.querySelector(".search-box");
document.querySelector("#search-icon").onclick = () => {
    search.classList.toggle("active");
    navbar.classList.remove("active");
}
let navbar = document.querySelector(".navbar");
document.querySelector("#menu-icon").onclick = () => {
    navbar.classList.toggle("active");
    search.classList.remove("active");
}
window.onscroll = () => {
     navbar.classList.remove("active");
    search.classList.remove("active");
}
const toTop = document.querySelector(".to-top");
const visibility = () => {
    if (document.documentElement.scrollTop <=2000){
        toTop.style.display = "none";
    } else {
        toTop.style.display = "block";
    }
};
visibility();
toTop.addEventListener("click", () => {
    document.body.scrollTop = 0;
});

document.addEventListener("scroll", () => {
    visibility();
});