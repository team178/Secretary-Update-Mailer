// CONSTANTS:
var calendarId = 'farmingtonrobotics.org_9cd1t9b8eknor0pqbk1s5g555k@group.calendar.google.com';
var eventName = 'Full Team Meeting';
var dayForEmailTitleMomentjsFormat = 'MMMM D';
var sendTimeAfterMeeting = [1, 'hour'];

// API:
// Moment.js Google Apps Library
// Library Project Key: MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48

// Load the moment library.
var moment = Moment.load();

function getDayForEmailTitle() {
  return moment().format(dayForEmailTitleMomentjsFormat);
}

function getUpcomingEvents() {
  var calendar = CalendarApp.getCalendarById(calendarId);
  var now = new Date();
  var fiveDaysFromNow = new Date(now.getTime() + (1000 * 60 * 60 * 24 * 5));

  var upcomingEvents = calendar.getEvents(now, fiveDaysFromNow);
  var text = "**Upcoming Events**:\n";

  for (var i = 0; i < upcomingEvents.length; i++) {
    var startTime = upcomingEvents[i].getStartTime();
    var endTime = upcomingEvents[i].getEndTime();

    var timeInEnglish = moment(startTime).format('dddd, MMMM Do h:mma') + '-' + moment(endTime).format('h:mma');
    text += timeInEnglish + ' - ' + upcomingEvents[i].getTitle() + "\n";
  }

  return text;
}

/**
 * Get the first occurange of a Full Team Meeting today.
 */
function getFullTeamMeetingToday() {
  var calendar = CalendarApp.getCalendarById(calendarId);
  var events = calendar.getEventsForDay(new Date());

  for (var i = 0; i < events.length; i++) {
    if (events[i].getTitle() == eventName) {
      return events[i];
    }
  }
  throw new Error('No Full Team Meeting Today');
}

function getTimeToSendEmailToday() {
  var meetingToday = getFullTeamMeetingToday();
  var endTime = meetingToday.getEndTime();
  return moment(endTime).add(sendTimeAfterMeeting[0], sendTimeAfterMeeting[1]).toDate();
}

function getFullTeamMeetingsThisWeek() {
  var calendar = CalendarApp.getCalendarById(calendarId);
  var now = new Date();
  var weekFromNow = new Date(now.getTime() + (1000 * 60 * 60 * 24 * 7));

  var fullTeamMeetingsThisWeek = calendar.getEvents(now, weekFromNow);

  // Filter out events for Full Team Meetings.
  for (var i = 0; i < fullTeamMeetingsThisWeek.length; i++) {
    if (fullTeamMeetingsThisWeek[i].getTitle() != eventName) {
      fullTeamMeetingsThisWeek.splice(i, 1);
      i--; // Go back one index since we just removed an element
    }
  }

  return fullTeamMeetingsThisWeek;
}
