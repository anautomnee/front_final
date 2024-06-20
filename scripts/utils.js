import * as element from "./elements.js";
import { filterArray } from "./filter.js";
import { eventsStore } from "./events.js";


export function createEventCard(eventObj, container, page = 'index') {

    const eventCard = document.createElement('div');
    const eventImage = document.createElement('img');
    const eventInfo = document.createElement('div');
    const eventTitle = document.createElement('h4');
    const eventCategory = document.createElement('p');
    const eventDate = document.createElement('p');
    const eventAttendees = document.createElement('p');
    const eventCost = document.createElement('p');

    container.append(eventCard);
    eventCard.append(eventImage, eventInfo)
    eventInfo.append(eventTitle, eventCategory, eventDate, eventAttendees);
    

    if (page === 'filter') {
        eventCard.setAttribute('class', 'eventFilterCard');
        eventInfo.setAttribute('class', 'eventFilterCardInfo');
        eventCategory.setAttribute('class', 'eventFilterCategory');
        eventDate.setAttribute('class', 'eventFilterDate');
        eventCost.setAttribute('class', 'eventFilterCost');
    } else {
        eventCard.setAttribute('class', 'eventCard');
        eventInfo.setAttribute('class', 'eventCardInfo');
        eventCategory.setAttribute('class', 'eventCategory');
        eventDate.setAttribute('class', 'eventDate');
        eventCost.setAttribute('class', 'eventCost');
        eventInfo.append(eventCost);
    }
    eventImage.setAttribute('src', eventObj.image);
    eventTitle.innerText = eventObj.title;
    eventCategory.innerText = eventObj.category;
    eventDate.innerText = rewriteDate(eventObj.date);
    // Check if events has attendees
    if (eventObj.attendees) {
        eventAttendees.innerText = eventObj.attendees;
        if (page === 'filter') {
            eventAttendees.setAttribute('class', 'eventFilterAttendees');
        } else {
            eventAttendees.setAttribute('class', 'eventAttendees');
        }
    } else {
        eventAttendees.hidden = true;
    };
    
    eventCost.innerText = "Free";

    // Check if online => add a plaque
    if (eventObj.type === "online") {
        const eventOnlinePlaque = document.createElement('div');
        eventInfo.append(eventOnlinePlaque);
        eventOnlinePlaque.setAttribute('class', 'eventOnlinePlaque');
        eventOnlinePlaque.innerText = 'Online Event';
    };
};




function rewriteDate(date) {

    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const PM = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const weekDay = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const dayNumber = date.getDate();
    let hour = date.getHours();
    const amPm = hour < 12 ? 'AM' : 'PM';
    if (amPm === 'PM') {
        PM.forEach((el, ind) => {
            if (el === hour) {
                if (hour < 22) {
                    hour = '0' + ind;
                } else {
                    hour = ind;
                }
            }
        })
    }
    const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes();

    const newDate = weekDay + ', ' + month + ' ' + dayNumber + ' · ' + hour + ':' + minutes + ' ' + amPm + ' PTD';
    return newDate;
};

export function sortOnlineEventsByTime(events) {
    // Get only online events
    let upcomingOnlineEventsArr = events.filter(event => event.type === 'online');
    // Sort by time
    upcomingOnlineEventsArr = upcomingOnlineEventsArr.sort((a, b) => a.date - b.date);
    //dates.sort().reverse()
    if (upcomingOnlineEventsArr.length > 4) {
        upcomingOnlineEventsArr = upcomingOnlineEventsArr.slice(0, 4);
    }
    return upcomingOnlineEventsArr;
};


export function changeFilter(arr) {

    let filteredEvents = eventsStore;
    arr.forEach(filter => {
        if (!filter.name.toString().includes('Any')) {
            filteredEvents = filteredEvents.filter(event => {
                return event[filter.type] === filter.name;
            });
        };
    })

    element.eventsFilterContainer.innerHTML = '';
    filteredEvents.forEach(event => createEventCard(event, element.eventsFilterContainer, 'filter'));

};

export function changeFilterWord(event, i) {
    const eventsFilterBtn = event.target.parentNode.previousElementSibling;
    let filterWord = event.target.textContent;
    eventsFilterBtn.textContent = filterWord;

    if (filterWord.includes('km')) {
        filterWord = Number(filterWord.split(' km')[0]);
    } else if (event.target.textContent.includes('line')) {
        filterWord = filterWord.toLowerCase();
    }

    filterArray[i].name = filterWord;
}

export function hideFilterOptions(filterBtn) {
    console.log(filterBtn);
}