// CONSTANTS:
var notesRow = 3;
var notesCol = 1; // cell B4

var projectUpdateRowBegin = 6;
var projectUpdateColBegin = 1; // cell B7

/**
 * Get Notes & Reminders
 */
function getNotes() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  return data[notesRow][notesCol];
}

/**
 * Get the Project Update from the table
 */
function getProjectUpdate() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var projectUpdate = "**Project Updates**:\n";

  for (var i = projectUpdateRowBegin; i < data.length; i++) {
    var name = data[i][projectUpdateColBegin].trim();
    var leader = data[i][projectUpdateColBegin+1].trim();
    var update = data[i][projectUpdateColBegin+2].trim();
    projectUpdate += '- **' + name + '** (' + leader + ') - ' + update + "\n";
  }
  return projectUpdate;
}
