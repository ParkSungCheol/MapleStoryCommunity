const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");


btn1.addEventListener("click", () => {
    $(".cont2").addClass("hidden");
    $(".cont1").removeClass("hidden");
})

btn2.addEventListener("click", () => {
    $(".cont2").removeClass("hidden");
    $(".cont1").addClass("hidden");
})