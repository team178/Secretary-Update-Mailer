/**
 * Remove all triggers
 */
function removeAllTriggers() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var triggers = ScriptApp.getUserTriggers(sheet);

  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

/**
 * Double check that there's still a Full Team Meeting. Then send!
 */
function prepareEmailDelivery() {
  try {
    var fullTeamMeeting = getFullTeamMeetingToday();
  } catch (error) {
    return;
  }

  sendEmail();
}

/**
 * Create a trigger for a Full Team Meeting later today. +/- 15 minutes.
 * throws No Full Team Meeting Today
 */
function installFullTeamMeetingTrigger() {
  var triggerTime = getTimeToSendEmailToday();
  ScriptApp.newTrigger('prepareEmailDelivery')
    .timeBased()
    .at(triggerTime)
    .create();
}

/**
 * Install a trigger that runs every day to check for Full Team Meetings
 */
function installPeriodicTrigger() {
  ScriptApp.newTrigger('installFullTeamMeetingTrigger')
    .timeBased()
    .atHour(0)
    .everyDays(1)
    .create();
};
