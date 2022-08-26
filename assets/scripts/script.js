const sliders = document.querySelectorAll('.slider'), 
imgs = [
    "url('./assets/img/tree-736885_960_720.webp') center/cover no-repeat",
    "url('./assets/img/tree-736885_960_720.webp') center/cover no-repeat",
    "url('./assets/img/tree-736885_960_720.webp') center/cover no-repeat",
    "url('./assets/img/tree-736885_960_720.webp') center/cover no-repeat" ];
let sliderArr = [];
let Slider = {
    navBar : false,
    navArrow : false,
    navDots : false,
    navigation : false,
    navLinks : false,
    sliderImg : false,
    scrollMode : 'scroll-horizontal',
    activeIndex : 0,
    childs: 0,

    Previous : function() {
        this.activeIndex - 1 < 0 ? this.activeIndex = this.childs - 1 : this.activeIndex--;
    },

    Next : function() {
        this.activeIndex + 1 > this.childs - 1 ? this.activeIndex = 0 : this.activeIndex++
    }
}

for (let i = 0; i < sliders.length; i++) {
    sliderArr.push(sliders[i]), sliderArr[i] = Object.create(Slider), sliderArr[i].childs = sliders[i].childElementCount
    sliders[i].classList.contains('nav-dots') ? sliderArr[i].navDots = true : sliderArr[i].navDots = false
    sliders[i].classList.contains('nav-arrow') ? sliderArr[i].navArrow = true : sliderArr[i].navArrow = false
    sliders[i].classList.contains('navigation') ? sliderArr[i].navigation = true : sliderArr[i].navigation = false
    sliders[i].classList.contains('slider-img') ? sliderArr[i].sliderImg = true : sliderArr[i].sliderImg = false
    sliders[i].parentNode.classList.contains('scroll-vertical') ? sliderArr[i].scrollMode = 'scroll-vertical' : sliderArr[i].scrollMode = 'scroll-horizontal'
    sliders[i].classList.contains('nav-links') ? sliderArr[i].navLinks = true : sliderArr[i].navLinks = false
    sliderArr[i].scrollMode == 'scroll-vertical' ? sliders[i].style.height = sliderArr[i].childs + '00%' : sliders[i].style.width = sliderArr[i].childs + '00%'
    if (sliderArr[i].navigation) {
        let navBar = document.createElement('nav')
        navBar.classList.add('nav-bar')
        sliders[i].closest('.slider-container').append(navBar)
        if (sliderArr[i].navDots) {
            for (let j = 0; j < sliderArr[i].childs; j++) {
                let dot = document.createElement('div')
                dot.classList.add('nav-dot')
                navBar.append(dot)
                if (sliderArr[i].navLinks) {
                    let temp = Array.from(sliders[i].children)
                    temp.forEach(element => {
                        if (element.classList.contains('slide')) {
                            if (temp.indexOf(element) == j) {
                                let title = element.getAttribute('name')
                                let link = document.createElement('div')
                                link.classList.add('nav-link')
                                dot.append(link)
                                link.innerHTML = `${title}`
                            }
                        }
                    })
                }
            }
        }

        if (sliderArr[i].sliderImg) {
            let childs = Array.from(sliders[i].children)
            for (let j = 0; j < imgs.length; j++) {
                [...childs].forEach(element => {
                    let temp = childs.indexOf(element)
                    if ( temp == j) {
                        element.style.background = imgs[j]
                    }
                });
            }
        }

        if (sliderArr[i].navArrow) {
            let arrowPrevious = document.createElement('div'), arrowNext = document.createElement('div')
            arrowPrevious.classList.add('nav-arrow-previous'), arrowNext.classList.add('nav-arrow-next')
            navBar.prepend(arrowPrevious), navBar.append(arrowNext)
        }

        if (sliderArr[i].navDots && sliderArr[i].navArrow) {
            navBar.children[sliderArr[i].activeIndex+1].classList.add('active');
        } else if (sliderArr[i].navDots && !sliderArr[i].navArrow){
            navBar.children[sliderArr[i].activeIndex].classList.add('active');
        }

        let navBarElm = Array.from(navBar.children)

        navBarElm.forEach(element => element.addEventListener('mouseover', function() {
            if (element.classList.contains('nav-dot')) {
                let navChild = Array.from(element.parentNode.children)
                navChild.forEach(child => child.classList.remove('active'))
            }
        }))

        navBarElm.forEach(element => element.addEventListener('mouseleave', function () {
            navBarElm[sliderArr[i].activeIndex+1]?.classList.add('active')
        }))

        navBarElm.forEach(element => 
            element.addEventListener('click', function(e) {
                [...this.parentNode.children].forEach(element => element.classList.remove('active'));
                if (this.classList.contains('nav-dot')) {
                    sliderArr[i].navArrow ? sliderArr[i].activeIndex = [...this.parentNode.children].indexOf(this) - 1 : [...this.parentNode.children].indexOf(this)
                    this.classList.add('active')
                } else if (this.classList.contains('nav-arrow-previous')) {
                    sliderArr[i].Previous()
                    if (sliderArr[i].navDots) {
                        this.parentNode.children[sliderArr[i].activeIndex + 1].classList.add('active') 
                    }
                } else if (this.classList.contains('nav-arrow-next')) {
                    sliderArr[i].Next()
                    if (sliderArr[i].navDots) {
                        this.parentNode.children[sliderArr[i].activeIndex + 1].classList.add('active')
                    }
                }
                let brotherElements = this.closest('.slider-container').children;
                [...brotherElements].forEach(element => {
                    if (element.classList.contains('slider')) {
                        element.parentNode.classList.contains('scroll-vertical') ? element.style.top = -sliderArr[i].activeIndex + '00%' : element.style.left = -sliderArr[i].activeIndex + '00%'
                    }
                });
        }));
   }
}