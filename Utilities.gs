/**
 * Utility function to include other html documents. Taken from Google Apps Script documentation.
 * https://developers.google.com/apps-script/guides/html/best-practices#separate_html_css_and_javascript
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .getContent();
}

/**
 * Custom markdown converter since sheets and the sidebar don't support rich text.
 * Only supports bold and unordered list.
 */
function convertToMarkdown(text) {
  // Bold
  text = text.replace(/\*\*(.*)\*\*/gm, function(match, p1) {
    return '<strong>' + p1 + '</strong>';
  });

  // Newlines
  text = text.replace(/\n/g, '<br />\n');

  // Unordered list
  text = text.replace(/(?:\n|^)\s*-\s+((?:.|\n)*?)(?=\n<br \/>\n|$)/g, function(match, p1) {
    return '<ul>' + match + '</ul>';
  });

  // List items
  text = text.replace(/\n\s{0,1}-\s+(.*)(?=\n|$)/g, function(match, p1) {
    return '<li>' + p1 + '</li>';
  });

  return text;
}
