/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const allSectionTags = document.getElementsByTagName('section');
const navigationBar = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function changeNavBarWhileScrolling(event){
    /* Check which section is the nearest in the view port to activate its nag item in the menu bar */
    let currentActSection = checkClosestSectionToViewPort();
    const activeListItem = navigationBar.querySelector(`li[data-id_nav="${currentActSection.id}"]`);
    activeListItem.classList.add('active_section');

    /* Loop over all nagivation bar elements and remove the active_section class */
    for (let navLink of listOfNavLinksElements) {
        if ((navLink.dataset.id_nav != activeListItem.dataset.id_nav) & navLink.classList.contains('active_section')) {
            navLink.classList.remove('active_section');
        }
    }
}

function checkClosestSectionToViewPort()
{
    let activeSection;
    let minTopValue = Number.MAX_SAFE_INTEGER;

    for (section of allSectionTags) {
        let boundingBox = section.getBoundingClientRect();

        /* You have to get the section top value and add half the height and check if it closer to the top 
        of the view port or if there is other section is closer */
        const referenceLine = boundingBox.top + (boundingBox.height / 2.0);
        if ( referenceLine > 0 &  referenceLine < minTopValue) {
            minTopValue = referenceLine;
            activeSection = section;
        };
    };

    return activeSection;
}

function scrollToSpecificSection (event) {
    let scrollElement = document.querySelector(`#${event.target.dataset.id_nav}`);
    scrollElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBarfromSections() {
    /* Loop over all sections from HTML with section tag to create the navigation bar */
    for (let section of allSectionTags) {
        /* Create new list item tag */
        let newlistitem = document.createElement('li');
        /* Add class name based on the one in css file */
        newlistitem.className = 'menu__link';
        /* Set data-nav attribute with section id to easily nagivate to the required section */
        newlistitem.setAttribute('data-id_nav' , section.id); 
        /* Copy section id to list tab name */
        newlistitem.textContent = section.id;
        /* Finally append this new item list to the navigation bar */
        navigationBar.appendChild(newlistitem);
    };
};

// Add class 'active' to section when near top of viewport
function activateNavBarItemUponScrolling(){
    window.addEventListener('scroll', changeNavBarWhileScrolling);
}

// Scroll to anchor ID using scrollTO event
function scrollToClickedSection() {
    navigationBar.addEventListener('click', scrollToSpecificSection);
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavBarfromSections();

/* Set this a global variable but after calling buildNavBarfromSections() 
so the meny nag tabs has been created. (optimization)*/
const listOfNavLinksElements = navigationBar.getElementsByClassName('menu__link');

// Scroll to section on link click
scrollToClickedSection();

// Set sections as active
activateNavBarItemUponScrolling();