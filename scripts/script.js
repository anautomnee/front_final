import { eventsStore } from "./events.js";
import * as element from "./elements.js";
import * as utils from "./utils.js";

window.addEventListener('DOMContentLoaded', () => {
    // Prepopulate nav location
    element.navSearchLocation.value = "Mountain View, CA";
    // Prepopulate events
    for (let event of eventsStore ) {
        utils.createEventCard(event, element.eventsGrid);
    }
})