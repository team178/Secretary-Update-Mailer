// Copyright (c) 2015 Brandon Cheng <brandoncheng.personal@gmail.com>
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALLTHE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

// API:
//
// For more information on using the Spreadsheet API, see
// https://developers.google.com/apps-script/service_spreadsheet

/**
 * Add a custom menu to the active spreadsheet.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu('Secretary')
    .addItem('Show sidebar', 'showSidebar')
    .addToUi();
};

/**
 * Show the sidebar
 */
function showSidebar() {
  var ui = SpreadsheetApp.getUi();

  var content = HtmlService.createTemplateFromFile('Sidebar');

  // Push variables to template
  content.document = PropertiesService.getDocumentProperties();
  content.user = PropertiesService.getUserProperties();
  content.dayForEmailTitle = getDayForEmailTitle();
  content.notes = convertToMarkdown(getNotes());
  content.projectUpdate = convertToMarkdown(getProjectUpdate());
  content.upcomingEvents = convertToMarkdown(getUpcomingEvents());

  content = content
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('Email Settings')
      .setWidth(300);

  ui.showSidebar(content);
}
