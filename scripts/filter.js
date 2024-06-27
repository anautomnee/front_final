import { eventsStore } from "./events.js";
import * as element from "./elements.js";
import * as utils from "./utils.js";


export const filterArray = [{
    name: 'Any type',
    type: 'type'}, {
    name: 'Any distance',
    type: 'distance'}, {
    name: 'Any category',
    type: 'category'
}];

window.addEventListener('DOMContentLoaded', () => {
    // Prepopulate nav location
    element.navSearchLocation.value = "Mountain View, CA";
    // Prepopulate events
    for (let event of eventsStore ) {
        utils.createEventCard(event, element.eventsFilterContainer, 'filter');
    }

    // Filter

    // Dropdown scroll 

    element.filterBtns.forEach(btn => {btn.addEventListener('click', event => utils.openDropdown(event))});
    element.filterBtnsScrollContainer.addEventListener('scroll', event => utils.scrollDropdown(event));
    window.addEventListener('click', (event) => {
        const currentDropdown = document.querySelector('.dropOpen');
        if (currentDropdown) {
            if(event.target.tagName !== 'SPAN') {
                currentDropdown.style.display = 'none';
                currentDropdown.parentElement.classList.remove('btnDropOpen');
                currentDropdown.classList.remove('dropOpen');
            }
        }
    })
    
    // Listen for changing filters
    element.filterTypes.forEach(dropdownList => {
        dropdownList.addEventListener('click', event => {
            utils.changeFilterWord(event, 0);
            utils.changeFilter(filterArray, 'type');
        });
    });
    element.filterDistances.forEach(dropdownList => {
        dropdownList.addEventListener('click', event => {
            utils.changeFilterWord(event, 1);
            utils.changeFilter(filterArray, 'distance');
        });
    });

    element.filterCategories.forEach(dropdownList => {
        dropdownList.addEventListener('click', event => {
            utils.changeFilterWord(event, 2);
            utils.changeFilter(filterArray, 'category');
        });
    });
});