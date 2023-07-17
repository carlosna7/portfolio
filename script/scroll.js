function scrolll() {
    const left = document.querySelector(".scroll-images");
    left.scrollBy(-340, 0);

    if(window.innerWidth < 990){
        left.scrollBy(-280, 0)
    }

    if(window.innerWidth < 768){
        left.scrollBy(-240, 0)
    }

    if(window.innerWidth < 500){
        left.scrollBy(-215, 0)
    }
}

function scrollr() {
    const right = document.querySelector(".scroll-images");
    right.scrollBy(340, 0);

    if(window.innerWidth < 990){
        right.scrollBy(280, 0)
    }

    if(window.innerWidth < 768){
        right.scrollBy(240, 0)
    }

    if(window.innerWidth < 500){
        right.scrollBy(215, 0)
    }
}