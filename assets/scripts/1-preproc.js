"use strict";

/**
 * File to process CSV data.
 */

 var data_slices = null;
/**
 * Specifies the domain  by associating a street name to a specific color.
 *
 * @param color   10 color scale
 * @param data    CSV data
 */
function domainColor(color, data) {
  // TODO: Define the domain of variable "color" by associating a street name to a specific color
  color = d3.scaleOrdinal()
        .domain([data.columns.slice(1)])
        .range(d3.schemeSet2);
}

/**
 * Converts dates in the CSV file to Date objects.
 *
 * @param data    CSV data
 * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
 */
function parseDate(data) {
  // TODO: Convert the dates from the CSV file to date objects
  var parser = d3.timeParse("%Y-%m-%d");
   data_slices = data.columns.slice(1).map(function(id) {
        return {
            index: id,
            row: data.map(function(d){
                return {
                    date: parser(d.date),
                    streets: +d[id]
                };
            })
        };
      });
  var parser = d3.timeParse("%Y-%m-%d");
  data = data.map(function(d){
    return {
         date: parser(d.date),
         Berri: parseInt(d.Berri),
         Maisonneuve: parseInt(d.Maisonneuve),
         NotreDame: parseInt(d.NotreDame),
         Parc: parseInt(d.Parc),
         PontJacquesCartier: parseInt(d.PontJacquesCartier),
         RenéLévesque: parseInt(d.RenéLévesque),
         SaintAntoine: parseInt(d.SaintAntoine),
         SaintUrbain: parseInt(d.SaintUrbain),
         TotemLaurier: parseInt(d.TotemLaurier),
         Moyenne: parseInt(d.Moyenne)
    };
  })
  console.log(data);
}

/**
 * Sorts data by street name and then by date
 *
 * @param color     10 color scale (its domain contains the street names)
 * @param data      Data from CSV file
 *
 * @return Array    The sorted data which will be used to generate the graphic.
 *                  The returned element should be a table with 10 entries, one of each street and one for the average.
  *                 It should be of the following form:
 *
 *                  [
 *                    {
 *                      name: string      // Street name
 *                      values: [         // A table with 365 entries, one for each day
 *                        date: Date,     // The date
 *                        count: number   // The quantity of bikes on that day (convert it with parseInt)
 *                      ]
 *                    },
 *                     ...
 *                  ]
 */
function createSources(color, data) {
  // TODO: Return the object with the given format

}

/**
 * Specifies the domain of the scales used for the "focus" and "context" line charts for the X axis
 *
 * @param xFocus      X scale used for the "focus" line chart
 * @param xContext    X scale used for the "context" line chart
 * @param data        Data from the CSV file
 */
function domainX(xFocus, xContext, data) {
  // TODO: specify the domains for the "xFocus" and "xContext" variables for the X axis
  data = parseDate(data)
  xFocus.domain(d3.extent(data, function(d){ return d.date}));
}

/**
 * Specifies the domain of the scales used for the "focus" and "context" line charts for the X axis
 *
 * @param yFocus      Y scale used for the "focus" line chart
 * @param yContext    Y scale used for the "context" line chart
 * @param sources     Data sorted by street and date (see function "createSources").
 */
function domainY(yFocus, yContext, sources) {
  // TODO: specify the domains for the "xFocus" and "xContext" variables for the Y axis
  yFocus.domain([(0), d3.max(data_slices, function(c) {
      return d3.max(c.values, function(d) {
          return d.measurement + 4; });
          })
      ]);
}
