/*======================== MENU SHOW AND HIDDEN ========================*/
/*======================================================================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*========== MENU SHOW ===========*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*========== MENU HIDDEN ===========*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}



/*======================== REMOVE MENU MOBILE ========================*/
/*====================================================================*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    // When we click on each nav_link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



/*======================== ACCORDION SKILLS ========================*/
/*==================================================================*/
const skillsContent = document.getElementsByClassName('skills_content'),
        skillsHeader = document.querySelectorAll('.skills_header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills_content skills_close'
    }
    if(itemClass === 'skills_content skills_close') {
        this.parentNode.className = 'skills_content skills_open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})



/*======================== QUALIFICATIONS TABS ========================*/
/*=====================================================================*/
const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification_active')
        })
        target.classList.add('qualification_active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification_active')
        })
        tab.classList.add('qualification_active')
    })
})



/*=========================== SERVICE MODAL ===========================*/
/*=====================================================================*/
const modalViews = document.querySelectorAll('.services_modal'),
        modalBtns = document.querySelectorAll('.services_button'),
        modalCloses = document.querySelectorAll('.services_modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

// When we click on the button we activate the modal's view by adding the active-modal class
modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

// When we click on close the active-modal class is removed add modal becomes hidden
modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})



/*======================== PORTOFOLIO SWIPER ==========================*/
/*=====================================================================*/
let swiper = new Swiper(".portfolio_container", {
    cssMode: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});



/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
/*=====================================================================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)



/*====================== CHANGE BACKGROUND HEADER =====================*/
/*=====================================================================*/
function scrollHeader() {
    const nav = document.getElementById('header')
    //When the scroll is greater then 80 viewport height, add the scroll-header class
    if(this.scrollY >=80)
        nav.classList.add('scroll-header');
    else
        nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)



/*========================= SHOW SCROLL UP ============================*/
/*=====================================================================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // when the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll
    if(this.scrollY >= 560)
        scrollUp.classList.add('show-scroll');
    else
        scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)



/*======================== DARK LIGHT THEME ===========================*/
/*=====================================================================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

//Activate / Deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove  the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*======== CONTACT FORM BUTTON TEXT CHNAGE ON SUBMIT AND ALERT MESSAGE ========*/
/*=============================================================================*/
const btn = document.getElementById('submit');
const form = document.getElementById('contact-form');

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    //When we submit the form, the content of the button prints "Sending..."
    btn.innerHTML = 'Sending...';

    const serviceID = 'contact_service';
    const templateID = 'contact_form';

    // Send the form data using EmailJS
    emailjs.sendForm(serviceID, templateID, this).then(() => {

    // Reset the form inputs
    form.reset();

     // If the email was sent successfully, set the button text to 'Send Email'
    btn.innerHTML = 'Send Message';

    // Show an alert to the user
    alert('Your form has been sent!');
    }, (err) => {
    // If there was an error, set the button text to 'Send Email'
    btn.innerHTML = 'Send Message';
    alert(JSON.stringify(err));
    });
});