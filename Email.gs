/**
 * Compile everything and send an email
 */
function sendEmail() {
  var documentProperties = PropertiesService.getDocumentProperties();

  var to = documentProperties.getProperty('to');
  var subject = getDayForEmailTitle() + ' ' + documentProperties.getProperty('title');
  var htmlBody = documentProperties.getProperty('body');

  htmlBody += "\n\n" + getNotes();
  htmlBody += "\n\n" + getProjectUpdate();
  htmlBody += "\n" + getUpcomingEvents();
  htmlBody = convertToMarkdown(htmlBody);

  MailApp.sendEmail({
    to: to,
    subject: subject,
    htmlBody: htmlBody,
  });
}
