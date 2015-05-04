/**
 * Store data retrieved from sidebar
 */
function processForm(formObject) {
  var documentProperties = PropertiesService.getDocumentProperties();
  var userProperties = PropertiesService.getUserProperties();

  var automatic = formObject.automatic == 'on' ? true : false;
  var automaticUserProperty = userProperties.getProperty('automatic') == 'true' ? true : false;

  if (!automaticUserProperty && automatic) {
    // Switch was turned on. Install Trigger.
    installPeriodicTrigger();
  } else if (automaticUserProperty && !automatic) {
    removeAllTriggers();
  }

  userProperties.setProperty('automatic', automatic);
  documentProperties.setProperty('to', formObject.to);
  documentProperties.setProperty('title', formObject.title);
  documentProperties.setProperty('body', formObject.body);
}

function sendConfirmation() {
  var ui = SpreadsheetApp.getUi();
  var documentProperties = PropertiesService.getDocumentProperties();

  var result = ui.alert(
      'Please confirm',
      'Are you sure you want to send this email to ' + documentProperties.getProperty('to') + '?',
       ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    sendEmail();
    return true;
  }
  return false;
}
