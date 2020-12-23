/**
 * Summary. Function to get header line for a sheet of a SpreadSheetApp object
 *
 * @param {Object} sheet         a sheet from SpreadSheetApp object.
 *
 * @return {Array} sheet header as string array.
 */
function getHearderData(sheet){
  var firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var firstRowValues = firstRange.getValues();
  var titleColumns = firstRowValues[0];
  
  return titleColumns;
}
  
/**
 * Summary. Function to get data without header for a sheet of a SpreadSheetApp object
 *
 * @param {Object} sheet     a sheet from SpreadSheetApp object.
 *
 * @return {Array} Array of rows as data.
 */
function getDataWithoutHeader(sheet){
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  var dataWithoutHeaders = data.getValues();   

  //Logger.log("Last Row : " + sheet.getLastRow());
  //Logger.log("Last Column : " + sheet.getLastColumn());
  return dataWithoutHeaders;
}
  
/**
 * Summary. Function to filter Data by date
 *
 * @param {Array} data   data without header
 * @param {Int} dateColumnIndex   date column index
 * @param {Date} dateStart   start date
 * @param {Date} dateEnd   end date
 *
 * @return {Array} filtered data
 */
function filterDataByDate(data, dateColumnIndex,dateStart,dateEnd){
  var dataWithRangeDate = data.filter(function(row){
    var d = row[dateColumnIndex - 1];
    return (d instanceof Date) && d.getTime() >= dateStart.getTime() && d.getTime() <= dateEnd.getTime();
  });
  
  return dataWithRangeDate;
}

/**
 * Summary. Function to sort in ascending or descending order
 *
 * @param {Array} data   data without header
 * @param {Int} sortColumnIndex   date column index
 * @param {Boolean} sortAsc   start date
 *
 * @return {Array} sorted data
 */
function sortData(data,sortColumnIndex,sortAsc){     
  var dataSorted = data.sort(function(a, b){
    
    if(sortAsc) {
      return a[sortColumnIndex - 1] - b[sortColumnIndex - 1];
    }
    else {
      return b[sortColumnIndex - 1] - a[sortColumnIndex - 1];
    }
  });
  
  return dataSorted;    
}

/**
 * Summary. Function to format data to Json
 *
 * @param {Array} dataHeader   data  header
 * @param {Array} dataWithoutHeader   data without header
 *
 * @return {Array} data in Json format.
 */
function formatDataToJson(dataHeader,dataWithoutHeader){
    // create json
  var jsonArray = [];
  var values = dataWithoutHeader.map(function(row) {
    var json = new Object();
    for(var i=0; i<dataHeader.length; i++) {
      json[dataHeader[i]] = row[i];
    }
    jsonArray.push(json);
  });
  return jsonArray;
}

/**
 * Summary. Function to replace all search occurances in a string
 *
 * @param {String} text   input string
 * @param {String} search   string to find
 * @param {String} replace   string to replace the found one
 *
 * @return {String} new string.
 */
function replaceAll(text, search, replace) {
  return text.split(search).join(replace);
}

/*
function convertSheet2JsonText(spreadSheet,sheetName,opts) {
  var sheet = spreadSheet.getSheetByName(sheetName);
  
  // first line(title)
  var colStartIndex = 1;
  var rowNum = 1;
  var firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var firstRowValues = firstRange.getValues();
  var titleColumns = firstRowValues[0];
  
  // after the second line(data)
  var lastRow = sheet.getLastRow();
  var rowValues = [];
  for(var rowIndex=2; rowIndex<=lastRow; rowIndex++) {
    var colStartIndex = 1;
    var rowNum = 1;
    var range = sheet.getRange(rowIndex, colStartIndex, rowNum, sheet.getLastColumn());
    var values = range.getValues().map(function(row) {
      if (opts === undefined) {
        rowValues.push(row);
        return row;
      }
      else {
        var obj1 = row[opts.position -1];
        var obj2 = opts.data;
        
        if((obj1 instanceof Date) && (obj2 instanceof Date) && obj1.getTime() === obj2.getTime()) {
          rowValues.push(row);
          return row;
        }
      }
    });
  }
  
  // create json
  var jsonArray = [];
  for(var i=0; i<rowValues.length; i++) {
    var line = rowValues[i];
    var json = new Object();
    for(var j=0; j<titleColumns.length; j++) {
      json[titleColumns[j]] = line[j];
    }
    jsonArray.push(json);
  }
  return jsonArray;
}

function getChildrenByAttribute(element, attributeName, attributeValue) {  
  var children = [];
  var descendants = element.getDescendants();  
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if( elt !=null) {
      var id = elt.getAttribute(attributeName);
      if( id !=null && id.getValue() == attributeValue) {
        children.push(elt);   
      }
    }
  }
  
  return children;
}
*/
function test(){
  var spreadSheet = SpreadsheetApp.openById("1ewA6XCCQe3MaBfBt6u5jMJdGNt9U86mWcG4Ob9dNHfM");
   var sheetGoogleForms = spreadSheet.getSheetByName("Google Forms");
  var sheetReplace = spreadSheet.getSheetByName("Replace");

  var googleFormsColumnName = "Name";
  var googleFormsColumnFormId = "Form Id";
  var googleFormsColumnActive = "Active";

  var dataHeaderGoogleForms = getHearderData(sheetGoogleForms);
  var dataWithoutHeaderGoogleForms = getDataWithoutHeader(sheetGoogleForms);
  var jsonGoogleForms = formatDataToJson(dataHeaderGoogleForms,dataWithoutHeaderGoogleForms);
}

