"use strict";
/**
 *
 * @param color   Scale of 10 colors.
 * @param data    Data from the CSV file.
 */
function domainColor(color, data) {
  // reader the header and exclude the date column..
  color.domain(data.columns.slice(1));
}

/**
 * Converts the dates found in the CSV file into a Date object. *
 * @param data    Data from the CSV file.
 * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
 */
function parseDate(data) {
  /**
  * We will create the parser,
  * and simply loop through every Date row and parse the data
  **/
  var parser = d3.timeParse("%d/%m/%y")
  data.map(function(d){
     d.Date = parser(d.Date)
  })
}

function createSources(color, data) {
  /**
  * We will sort the data and return the results to the caller
  * sort by date then by street name..
  * parse the street values to the integer..
  *
  */
  var sorting = [];
  var domain = color.domain();
  domain.forEach(name => {
    sorting.push({name:name, values:[]});
  })
  data.forEach(rows => {
    for(var head in rows) {
      if(head !== "Date") {
        var row_data = sorting.find(obj => obj.name == head);
        row_data.values.push({date:rows["Date"], count:parseInt(rows[head], 10)});
      }
    }
  })
  return sorting;
}

/**
 *Specifies the range of scales used by the "focus" and "context" graphs for the X axis. *
 *
 * @param xFocus      X scale used with the "focus" graph.
 * @param xContext    X-scale used with the "context" graph.
 * @param data        Data from the CSV file.
 */
function domainX(xFocus, xContext, data) {
  // Set Date column to the x-axis, by simply selecting the range..!
  xFocus.domain([data[0].Date, data[data.length-1].Date]);
  xContext.domain([data[0].Date, data[data.length-1].Date]);
}

/**
 * Specifies the range of scales used by the "focus" and "context" graphs for the Y axis.
 *
 * @param yFocus      Y scale used with the "focus" graph.
 * @param yContext    Y scale used with the "context" graph.
 * @param sources     Data sorted by street name and date (see "createSources" function).
 */
function domainY(yFocus, yContext, sources) {
  //We need to select the max yvalue, for our ydomain..!
  var maxVal = d3.max(sources.map(source => d3.max(source.values.map(value => value.count))))
  yFocus.domain([0, maxVal])
  yContext.domain([0, maxVal])
}
