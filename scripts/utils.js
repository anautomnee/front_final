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

    eventCard.setAttribute('class', 'eventCard');
    eventImage.setAttribute('src', eventObj.image);
    eventTitle.innerText = eventObj.title;
    eventCategory.innerText = eventObj.category;
    eventDate.innerText = eventObj.date;
    eventAttendees.innerText = eventObj.attendees;
    eventCost.innerText = "Free";
}
