/**
 * Founders Residency — application intake.
 *
 * Deploy: Extensions → Apps Script, paste this file, then
 * Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the /exec URL into the site's VITE_SHEETS_ENDPOINT.
 *
 * Redeploy ("Manage deployments → Edit → New version") after every edit,
 * otherwise the old code keeps serving.
 */

/**
 * The "Arizalar" spreadsheet — the id is the part of its URL between
 * /d/ and /edit. Leave it filled and the script works standalone as well as
 * bound to the sheet; empty it to always use the sheet the script lives in.
 */
var SPREADSHEET_ID = '1Jg6FSdsXPsACfYMiGGmiypdj8xK4UujoxbPVoxB6Ono'

var SHEET_NAME = 'Arizalar'

var HEADERS = [
  'Vaqt',
  'Ism Familiya',
  'Telefon',
  'Username',
  'Oʻzi haqida',
  'Holati',
  'Fakultet',
  'Ish joyi',
  'Turar joyi',
  'Hard skills',
  'Ijro dalillari',
  'Bandligi',
  'Nima uchun aynan siz',
]

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput({ ok: false, error: 'Empty request body' })
    }

    var data = JSON.parse(e.postData.contents)

    if (!data.fullName || !data.phone) {
      return jsonOutput({ ok: false, error: 'Missing required fields' })
    }

    var sheet = getSheet()
    sheet.appendRow([
      data.submittedAt ? new Date(data.submittedAt) : new Date(),
      data.fullName || '',
      // Leading apostrophe keeps +998… as text instead of a broken formula.
      "'" + (data.phone || ''),
      '@' + (data.username || ''),
      data.bio || '',
      data.statusLabel || (data.statuses || []).join(', '),
      data.faculty || '',
      data.workplace || '',
      data.city || '',
      (data.skills || []).join(', '),
      data.portfolio || '',
      data.commitmentLabel || data.commitment || '',
      data.motivation || '',
    ])

    return jsonOutput({ ok: true })
  } catch (error) {
    return jsonOutput({ ok: false, error: String(error) })
  }
}

/** Lets you open the /exec URL in a browser to check the deployment is live. */
function doGet() {
  return jsonOutput({ ok: true, service: 'founders-residency-intake' })
}

function getSheet() {
  var book = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet()

  var sheet = book.getSheetByName(SHEET_NAME)

  if (!sheet) {
    var sheets = book.getSheets()
    // Reuse the untouched default tab instead of leaving it empty beside ours.
    if (sheets.length === 1 && sheets[0].getLastRow() === 0) {
      sheet = sheets[0].setName(SHEET_NAME)
    } else {
      sheet = book.insertSheet(SHEET_NAME)
    }
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }

  return sheet
}

function jsonOutput(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload),
  ).setMimeType(ContentService.MimeType.JSON)
}
