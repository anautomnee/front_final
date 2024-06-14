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

})