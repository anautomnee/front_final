export function createEventCard(eventObj, container) {

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
    eventInfo.append(eventTitle, eventCategory, eventDate, eventAttendees, eventCost);

    eventInfo.setAttribute('class', 'eventCardInfo')
    eventCard.setAttribute('class', 'eventCard');
    eventImage.setAttribute('src', eventObj.image);
    eventTitle.innerText = eventObj.title;
    eventCategory.innerText = eventObj.category;
    eventCategory.setAttribute('class', 'eventCategory')
    eventDate.innerText = rewriteDate(eventObj.date);
    eventDate.setAttribute('class', 'eventDate');
    // Check if events has attendees
    if (eventObj.attendees) {
        eventAttendees.innerText = eventObj.attendees;
        eventAttendees.setAttribute('class', 'eventAttendees');
    } else {
        eventAttendees.hidden = true;
    };
    
    eventCost.innerText = "Free";
    eventCost.setAttribute('class', 'eventCost');

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