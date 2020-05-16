"use strict";

/**
* File to handle zoom/brush
*/


/**
 * Allows to redraw the "focus" line chart based on the selected zome in the "conext" line chart
 *
 * @param brush     The selection zone in the context graphic
 * @param g         The SVG group in which the focus line chart is drawn
 * @param line      The function allowing to draw the lines of the graphic
 * @param xFocus    The X scale for the focus graphic
 * @param xContext  The X scale for the context graphic
 * @param xAxis     The X axis for the focus line chart
 * @param yAxis     The Y axis for the focus line chart
 *
 * @see http://bl.ocks.org/IPWright83/08ae9e22a41b7e64e090cae4aba79ef9 
 * @see https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172 
 */
function brushUpdate(brush, g, line, xFocus, xContext, xAxis, yAxis) {
  // TODO: Redraw the focus line chart as a function of the selected zone in the context line chart
  var focs = d3.event.selection || xContext.range()
  var invt = xContext.invert
  xFocus.domain(focs.map(invt, xContext))
  var streets = g.selectAll(".line")
  streets.attr("d", line)
  var axis = d3.select(".x.axis")
  axis.call(xAxis)
}

