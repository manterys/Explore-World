// ---------------------
// Java Script
// ---------------------


// appLoader()
// appAnimation()
// appStickyHeader()
// appMenuBtn()
// appCounter()
// appModal()
// appMoveTo()


// Global
const page = document.querySelector('.page')

// Loader
const appLoader = () => {
    const loader = document.querySelector('.loader')
    if (!loader) return
    
    
    function load() {
        setTimeout(() => {
            loader.style.opacity = 0
            loader.style.display = 'none'
            
            page.classList.add('loaded')
            setTimeout(() => (page.style.opacity = 1), 1000)
        }, 1200)
    }   
    load()
}

appLoader()

// Animation
const appAnimation = () => {
    const animR = document.querySelector('.animation-right')
    // const animL = document.querySelector('.animation-left')
    const animT = document.querySelectorAll('.animation-top')

    setTimeout(() => (animR.classList.add('show')), 2600)
    // setTimeout(() => (animL.classList.add('show')), 3000)

    window.addEventListener('scroll', anim)

    anim()

    function anim() {
    const triggerBottom = window.innerHeight
    
    animT.forEach(anim => {
        const animTop = anim.getBoundingClientRect().top
        // Reset Animation Top
        anim.classList.remove('show')
        
        if(animTop < triggerBottom) {
            anim.classList.add('show')
        } 
        else {
            anim.classList.remove('show')
        }
    })
    }
}

appAnimation()


// Sticky Header
const appStickyHeader = () => {
    const header = document.getElementById('header')
    const showcase = document.getElementById('showcase')
    let triggerHeight
    // if (!header && showcase) return

    triggerHeight = showcase.offsetHeight - 200;

    window.addEventListener('scroll', function () {
        let loc = window.scrollY
        if (loc > triggerHeight) {
            header.classList.add('scrolled')
        } else {
            header.classList.remove('scrolled')
        }
    })
    // console.log(triggerHeight)
}

appStickyHeader()


// Menu Button
const appMenuBtn = () => {
    const menuBtn = document.getElementById('menu-btn')
    if(!menuBtn) return

    menuBtn.addEventListener('click', () => page.classList.toggle('menuActive'))

    window.addEventListener('resize', function() {
        if (window.matchMedia('(min-width: 720px)').matches) {
            if (page.classList.contains('menuActive')) page.classList.remove('menuActive')
        }
    })

    const nav = document.querySelector('.nav')
    nav.querySelectorAll('.nav a').forEach(function(link) {
        link.addEventListener("click", function(e) {
            page.classList.remove('menuActive')
        })
    })
}

appMenuBtn()

// Counter
const appCounter = () => {
    const statistics = document.querySelector('.statistics')
    const startCount = document.querySelectorAll('.counter')
    
    let CounterObserver = new IntersectionObserver(
        (entries, observer) => {
            let [entry] = entries;
            if (!entry.isIntersecting) return;
            
            startCount.forEach(counter => {
                counter.innerText = '0'
                
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target')
                    const count = +counter.innerText
                    
                    const increment = target / 70
                    
                    if(count < target) {
                        counter.innerText = `${Math.ceil(count + increment)}`
          setTimeout(updateCounter, 40)
        } else {
            counter.innerText = target
        }
    }
    
    updateCounter()
})

observer.unobserve(statistics)
// observer.unobserve(statistics) -dodaje, że obserwacja jest tylko raz!

},
{
    root: null,
    threshold: window.innerWidth > 768 ? 0.3 : 0.2,
}
)
CounterObserver.observe(statistics)
}

appCounter()


// Modal
const appModal = () => {
    const modalBox = document.querySelector('.modal-box')
    const closed = document.querySelector('.modal-box svg')
    const img = document.querySelectorAll('.project')
    const modal = document.querySelectorAll('.modal')
    
    img.forEach(img => img.addEventListener('click', (e)=> {
        modalBox.classList.add('modalOpen')
        img.lastElementChild.classList.add('modalActive')
    }  
    ))
    
    closed.addEventListener('click', (e) => {
        modalBox.classList.remove('modalOpen')
            for(let i = 0; i < modal.length; i++) {
                modal[i].classList.remove('modalActive')
        }
    })

    modalBox.addEventListener('click', (e) => {
        if (e.target == modalBox) {
            modalBox.classList.remove('modalOpen')
            for(let i = 0; i < modal.length; i++) {
                modal[i].classList.remove('modalActive')
            }
    }})
}

// appModal()


// Button Scroll Top
const appTopBtn = () => {
    const pxShow = 600;
    const btnTop = document.querySelector(".btn-go-top")
    if (!btnTop) return
    if (window.scrollY >= pxShow) btnTop.classList.add("visible")
    window.addEventListener('scroll', function() {
        if (window.scrollY >= pxShow) {
            if(!btnTop.classList.contains('visible')) btnTop.classList.add("visible")
        } else {
            btnTop.classList.remove("visible")
        }
    });
}

appTopBtn()


// Move to
const appMoveTo = () => {
    const easeFunctions = {
        easeInQuad: function (t, b, c, d) {
            t /= d
        return c * t * t + b
    },
    easeOutQuad: function (t, b, c, d) {
        t /= d
        return -c * t* (t - 2) + b
    },
    easeInOutQuad: function (t, b, c, d) {
        t /= d/2
        if (t < 1) return c/2*t*t + b
        t--
        return -c/2 * (t*(t-2) - 1) + b
    },
    easeInOutCubic: function (t, b, c, d) {
        t /= d/2
        if (t < 1) return c/2*t*t*t + b
        t -= 2
        return c/2*(t*t*t + 2) + b
    }
    }

    const triggers = document.querySelectorAll('.smoothscroll')

    const moveTo = new MoveTo({
        tolerance: 30,
        duration: 1200,
        easing: 'easeInOutCubic',
        container: window
    }, easeFunctions)

    triggers.forEach(function(trigger) {
        moveTo.registerTrigger(trigger)
    })
}

appMoveTo()