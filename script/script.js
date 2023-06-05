const navbar = document.querySelector('.navbar');

document.querySelector('#btn-enabled').onclick = () => {
    navbar.classList.toggle('active');
} 

const btn = document.querySelector('#btn-enabled')

btn.addEventListener("click", () => {
    if (btn.classList.contains("fa-bars")) {
        btn.classList.remove("fa-bars")
        btn.classList.add("fa-xmark")
    } else if (btn.classList.contains("fa-xmark")) {
        btn.classList.remove("fa-xmark")
        btn.classList.add("fa-bars")
    }
})